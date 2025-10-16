import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from '../src/models/User.Model.js';

async function run() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('Connected to:', mongoose.connection.db?.databaseName);
    const users = await User.find().limit(5).lean();
    console.log('Sample users:', users);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
