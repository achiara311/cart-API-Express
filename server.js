//require/import the Express module
const express = require("express");

//require the router object (and all it's defined routes) to be used in this file
const { routes } = require("./routes");

//creates an instance of an Express application - allows us to create and use APIs
const app = express();

//Allow POST and PUT requests
//Allow JSON request bodies for PUT and POST
app.use(express.json());

//use the router object (with all the defined routes)
//Enable Cross Origin Resource Sharing so this API can be used from web apps on other domains
//use the router object (and all it's defined routes)
app.use("/", routes);


//define the port
const port = 3000;

//run the server
app.listen(port, () => console.log(`Listening on port: ${port}`));