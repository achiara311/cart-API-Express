//require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();
//ROUTES NEED TO GO UNDERNEATH HERE

const cartItems = [
    { id: 1, product: "apples", price: 1.90, quantity: 10 },
    { id: 2, product: "oranges", price: 3.70, quantity: 14 },
    { id: 3, product: "toothpaste", price: 7.50, quantity: 8 },
    { id: 4, product: "water", price: 4.30, quantity: 16 },
    { id: 5, product: "wine", price: 20.20, quantity: 10 },
];
let nextId = 6;
// routes.get("/cart-items", (req, res) => {
//     res.json(cartItems);
// });

//GET with query param
routes.get("/cart-items", (req, res) => {
    const maxPrice = parseFloat(req.query.maxPrice);
    const prefix = req.query.prefix;
    const pageSize = req.query.pageSize;
    if (maxPrice <= 3) {
        const filteredPrices = cartItems.filter((item) => item.price <= maxPrice);
        res.status(200);
        res.json(filteredPrices);
    }
    else if (prefix) {
        let filteredPrefix = cartItems.filter((item) => {
            return item.product.startsWith(prefix);
            //For Uppercase:
            // let currentItem = item.product.toLowerCase()
            // return currentItem.product.startsWith(prefix);
        });
        res.json(filteredPrefix);
    }
    else if (pageSize) {
        let myPageSize = parseInt(pageSize);
        let results = items.slice(0, myPageSize);
        res.json(results);
    }
    else {
        res.status(200);
        res.json(cartItems);
    }
});

//GET /cart-items/:id
routes.get("/cart-items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
        res.status(200);
        res.json(cartItem);
    }
    else {
        res.status(404);
        res.send(` Error 404, ${id} Not Found.`);
        //Plain text
    }
});


//POST /cart-items
routes.post("/cart-items", (req, res) => {
    const cartItem = req.body;
    cartItem.id = nextId++;
    cartItems.push(cartItem);
    res.status(201);
    res.json(cartItem);
});

//PUT /cart-items/:id
routes.put("/cart-items/:id", (req, res) => {
    const cartId = parseInt(req.params.id);

    const newCartItem = req.body;

    newCartItem.id = cartId;//saying have the CartId(paramsId) also be the id of what you're editing in the body
    const index = cartItems.findIndex(cartItem => cartItem.id === cartId);//===cartId has to match with const cartId
    cartItems.splice(index, 1, newCartItem);
    res.status(200);
    res.json(newCartItem);
});

//PUT ALTERNATIVE
// routes.put("/cart-items/:id", (req, res) => {
//     const cartId = parseInt(req.params.id);
//     let index = cartItems.findIndex((cartItem) => cartItem.id === cartId);
//     items[index].id=cartId;
//     cartItems[index]=req.body.id; //KEEP AN EYE ON THIS AND SEE IF IT WORKED ON TEST
//     res.status(200);
//     res.json(newCartItem);
// });

//DELETE /cart-items/:id
routes.delete("/cart-items/:id", (req, res) => {

    const cartId = parseInt(req.params.id);
    const index = cartItems.findIndex(cartItem => cartItem.id === cartId);
    if (index !== -1) {//if index DOES NOT equal negative one/if index FOUND SOMETHING....
        cartItems.splice(index, 1);
    }
    res.status(204);
    res.send("NOT HERE");
    //OR
    //res.sendStatus(204);
    //AKA PLAIN TEXT, ON ASSESSMENT
});
module.exports = { routes };