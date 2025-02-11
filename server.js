const express = require("express");
const app = express();
const PORT = 3000; // You can change this port as needed

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});