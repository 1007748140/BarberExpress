import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db';

dotenv.config();

const app = express();

// Middleware y rutas
app.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from database');
  }
});

export default app;
