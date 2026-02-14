import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTopCoins } from './services/crytoService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/api/ping', (req: Request, res: Response) => {
  res.json({ message: 'CoinPulse API is live! 🚀' });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server is up, but try /api/ping for data.');
});

app.get('/api/markets', async (req: Request, res: Response) => {
  try {
    const coins = await getTopCoins();
    res.json(coins);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch market data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});