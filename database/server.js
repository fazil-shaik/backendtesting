import express from 'express';
import pool from './db.js';

const app = express();
app.use(express.json());

// Example route
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query failed');
  }
});
app.post('/user', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if email already exists
    const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).send('Email already exists');
    }

    // Insert if not exists
    await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [name, email]
    );
    res.status(201).send('User added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add user');
  }
});

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    res.send('User updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update user');
  }
});

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.send('User deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete user');
  }
});

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
