import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import { Queues } from './models/models.mjs'
import { InternalServerError } from './models/errors.mjs';

import DAO from './dao/DAO.mjs';


const app = express();

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

app.use('/public', express.static('public'));

const PORT = 3001;

const server = http.createServer(app);

//obj to manage queues
const queues = new Queues();
//Initialize queues forEach service available
//TODO: retrive service based on real day by day assigment (based on date)
async function inizializeQueues() {
    const services = await DAO.getAllServices()
    const serviceInfo = services.map(service => ({
        serviceID: service.id,
        avgServiceTime: service.average_time
    }));
    queues.inizializeQueues(serviceInfo);
}
inizializeQueues();
//TODO: implement code to reset queues every morning!!


//SOCKET
// io is used to handle the WebSocket
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
io.on('connection', socket => {
    console.log(`New user: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} has been disconnected. Removing it from queue!`);        
        queues.removeTicket(socket.id);
    })
})


//SERVICES
app.get('/api/services', async (req, res) => {
    try{
        const services = await DAO.getAllServices();
        return res.status(200).json(services);
    }catch(err){
        return res.status(500).json(new InternalServerError())
    }
});
app.post('/api/queues/:serviceID', async (req, res) => {
    try {
        const serviceID = parseInt(req.params.serviceID);
        const customerID = req.body.customerID
        
        const ticket = await DAO.createTicket(serviceID); //ticket is an obj {number, id, service_id}
        queues.addTicket(serviceID, customerID, ticket.id);
        
        return res.status(200).json({ 
            "number": ticket.number,
            "id": ticket.id,
            "service": ticket.service_id  
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json(new InternalServerError())
    }
    
});

//COUNTERS
app.get('/api/counters', async (req, res) => {
  try {
      const counters = await DAO.getAllCounters();
      console.log(counters);
      res.json(counters);
  } catch {
      res.status(500).json({error: 'Internal server error'});
  }
})
//API for selectNextCustomer 
app.post('/api/counter/:counterID/next/:previousTicketId', async(req, res) => {
    try {
        const previousTicketId = parseInt(req.params.previousTicketId);
        const counterID = parseInt(req.params.counterID);
        
        //close previous ticket if any
        if (previousTicketId && previousTicketId > 0) {
            await DAO.closeTicket(previousTicketId);
        }

        //retrive services assigned to the counter
        const serviceIDs = await DAO.getServicesAssignedToCounter(counterID);
        const ticket = queues.getNextTicket(serviceIDs); // ticket is an obj {customerID, ticketID}
        
        if (!ticket) {
            return res.status(200).json({ message: 'No tickets in queue' });
        }
        //retrive ticket info from db
        const ticketInfo = await DAO.getTicket(ticket.ticketID);
        //await DAO.assignTicketToCounter(ticket.ticketID, counterID);
        
        return res.status(200).json({
            ...ticketInfo,
            customerID: ticket.customerID
        });
    } catch (error) {
        console.error('Error in selectNextCustomer:', error);
        return res.status(500).json(new InternalServerError());
    }
})



server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
