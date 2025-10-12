import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { 
    getAllServices 
} from './dao.mjs';


const app = new express();
const port = 3001;


app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

app.use('/public', express.static('public'));



//SERVICES
app.get('/api/services', async (req, res) => {
    try {
        const services = await getAllServices();
        console.log(services);
        res.json(services);
    } catch {
        res.status(500).json({error: 'Internal server error'});
    }
})










app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
