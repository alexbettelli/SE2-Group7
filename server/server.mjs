import express from 'express';
import http, { METHODS } from 'http';
import { Server } from 'socket.io'
import cors from 'cors';
import { getServices } from './dao/serviceDAO.mjs';
import { InternalServerError } from './models/errors.mjs';

const PORT = 3001;
let lastTicket = 0;

const app = express();
const server = http.createServer(app);
// io is used to handle the WebSocket
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

app.use(express.json());

io.on('connection', socket => {
    console.log(`New user: ${socket.id}`);
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
    if(customerID === undefined) return res.status(400).end();
    if(!queues.has(serviceID)) queues.set(serviceID, [ customerID ]);
    else queues.get(serviceID).push(customerID);
    console.log(queues);
    return res.status(200).json({ "number": ++lastTicket});
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})
