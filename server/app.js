import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import BodyParser from 'body-parser';

dotenv.config();

import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(BodyParser.json());
app.use(helmet());

const listeningPort = process.env.PORT ? process.env.PORT : 4000;

app.use('/api', routes)

app.listen(listeningPort, () => {
    console.log(`Server Listening on ${listeningPort}.!`);
});