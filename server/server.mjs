import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors';
import { getServices } from './dao/serviceDAO.mjs';
import { InternalServerError } from './models/errors.mjs';
import morgan from 'morgan';
import passport from 'passport';
import {
    getAllCounters
} from './dao.mjs';


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
        queues.forEach((value, key) => {
            queues.set(key, value.filter(user => user.socketID != socket.id));
        });
        console.log(queues);
    })
})

const queues = new Map();

app.get('/api/services', async (req, res) => {
    try{
        const services = await getServices();
        return res.status(200).json(services);
    }catch(err){
        return res.status(500).json(new InternalServerError())
    }
});

app.post('/api/queues/:serviceID', (req, res) => {
    const serviceID = req.params.serviceID;
    const customerID = req.body.customerID;
    const ticket = "Fake Ticket"; // Aurora, here you should implement the get ticket function
    if(customerID === undefined) return res.status(400).end();
    if(!queues.has(serviceID)) queues.set(serviceID, [ {"socketID": customerID, "ticket": ticket} ]);
    else queues.get(serviceID).push({"socketID": customerID, "ticket": ticket});
    console.log(queues);
    return res.status(200).json({ "number": ticket});
});



//COUNTERS
app.get('/api/counters', async (req, res) => {
  try {
      const counters = await getAllCounters();
      console.log(counters);
      res.json(counters);
  } catch {
      res.status(500).json({error: 'Internal server error'});
  }
})



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
