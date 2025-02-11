const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// CREATE
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating User' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Users' });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching User' });
  }
});

// UPDATE a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting User' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
