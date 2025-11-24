import cors from 'cors';
import express from 'express';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

export default app;
