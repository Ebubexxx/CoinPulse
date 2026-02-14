import Coingecko from '@coingecko/coingecko-typescript';
import dotenv from 'dotenv';

// 1. Load the .env variables so process.env works
dotenv.config();

// 2. Initialize the client (This must happen OUTSIDE the function)
const cgClient = new Coingecko({
  demoAPIKey: process.env.COINGECKO_KEY_API, 
  environment: 'demo' 
});

export const getTopCoins = async () => {
  try {
    console.log("--- Calling CoinGecko API ---");
    
    const response = await cgClient.coins.markets.get({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
    });

    // LOG: See what we actually got back
    console.log("RAW RESPONSE DATA:", response);

    // 3. Transform the data for our React frontend
    return response.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: (coin.symbol || '').toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      image: coin.image
    }));

  } catch (error: any) {
    console.error("--- API ERROR LOG ---");
    console.error("Status:", error?.status);
    console.error("Message:", error?.message);
    
    // This re-throws the error so index.ts can handle it
    throw error; 
  }
};