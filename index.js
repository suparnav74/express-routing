const express = require("express");
const app = express();

const port = process.env.port || 3000;
// Simple Routing
// app.get("/", (req, res) => {
//     res.send(`<div>
//     <h2>Welcome to Home Page</h2>
//     <h5>Middleware</h5>
//   </div>`);
// });


// Using Middleware
app.get(
    "/",
    (req, res, next) => {
        console.log("hello");
        next();
    },
    (req, res) => {
        res.send(
            `<div>
               <h2>Welcome to Home Page</h2>
               <h5>Middleware</h5>
            </div>`
        );
    }
);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});