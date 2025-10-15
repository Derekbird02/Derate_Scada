import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://app.graava.com'], // allow dev + production
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true, // allow cookies if your frontend sends them
}));

// Optional: handle preflight for a specific route
app.options('/aio/amslogin', (req, res) => res.sendStatus(200));

// Your routes
app.post('/aio/amslogin', (req, res) => {
  // login logic
});
