import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Connection from './database/db.js';
import Router from './routes/route.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Router);

const PORT = 4000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}!`));

Connection(process.env.DB_USERNAME, process.env.DB_PASS);