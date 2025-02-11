const dotenv = require('dotenv');
const express = require("express");
const mysql = require('mysql2');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;
dotenv.config();

// Helmet to secure HTTP headers
app.use(helmet());

// CORS to allow specific origins
const corsOptions = {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Rate Limiting to prevent abuse (100 requests per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Express Server
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Using inbuilt middleware express.json()
app.use(express.json());
// app.post('/', (req, res) => {
//     const { name } = req.body;
//     res.send(`Welcome ${name}`);
// })


// Express using mysql
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});


// POST
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: 'Name, email, and age are required' });
    }
    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    db.query(query, [name, email, age], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, name, email, age });
    });
  });

// GET all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  });

// GET user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(results[0]);
    });
  });

// PUT
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;
    
    const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(query, [name, email, age, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  });

// DELETE
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    });
  });

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});
