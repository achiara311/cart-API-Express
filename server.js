//require/import the Express module
const express = require("express");

//require the router object (and all it's defined routes) to be used in this file
const { routes } = require("./routes");

//creates an Express application - allows us to create and use APIs
const app = express();

//Allow JSON request bodies for PUT and POST
app.use(express.json());

//use the router object (and all it's defined routes)
app.use("/", routes);

//define the port
const port = 3000;

//run the server
app.listen(port, () => console.log(`Listening on port: ${port}`));