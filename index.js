import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './mongodb/connect.js';

import createRoutes from './routes/createRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import updateRoutes from './routes/updateRoutes.js';
import showRoutes from './routes/showRoutes.js';

dotenv.config();

const app = express();

//middleware
app.use(cors());

app.use(bodyParser.json());

//routes
//api endpoints
app.use('/createtodo', createRoutes);
app.use('/deletetodo', deleteRoutes);
app.use('/updatetodo', updateRoutes);
app.use('/showtodo', showRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to todo list project, This is Home page.");
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server is running on http://localhost:8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();