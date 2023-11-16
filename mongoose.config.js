import { MongoClient } from 'mongodb';

const connectDB = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://devadamtech:8O9Mcj5SNT0uN9FU@owp.xbuyuie.mongodb.net/fiatless?retryWrites=true&w=majority');
    const db = client.db('product');
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Create a reusable connection instance
const db = await connectDB();

export default db