import { Request, Response } from "express";
import routes from "./routes/routes";

import express from 'express';

import bodyParser from 'body-parser';

import * as dotenv from "dotenv";
import { createOutputFolder } from "./utils/createOutputFolder";

const app = express();
var cors = require('cors')
dotenv.config()
const port = process.env.PORT || 5000;

// parse application/json
app.use(bodyParser.json({ limit: '100mb' }))

app.use(cors())

app.use('/api', routes);

createOutputFolder()

app.get('/', (req: Request, res: Response) => {
  res.send('Mediacraft API');
});
app.get('/test', (req: Request, res: Response) => {
  res.send('Backend is running..');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})