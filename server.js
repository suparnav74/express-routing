const express = require("express");
const app = express();
const PORT = 3000;

// Express Server
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Using inbuilt middleware express.json()
app.use(express.json());
app.post('/', (req, res) => {
    const { name } = req.body;
    res.send(`Welcome ${name}`);
})

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});