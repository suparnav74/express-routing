const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>My HTML Page</title>
    </head>
    <body>
      <h1>Welcome to My HTML Page</h1>
    </body>
    </html>
  `;

    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
