const express = require("express");
const routes = express.Router();

const cartitems = [
	{ id: 1, product: "egg", price: 1.5, quantity: 100 },
	{ id: 2, product: "duck egg", price: 1.75, quantity: 100 },
	{ id: 3, product: "extra large egg", price: 2.0, quantity: 50 },
	{ id: 4, product: "quail egg", price: 100.0, quantity: 2 },
	{ id: 5, product: "ostrich egg", price: 1000.0, quantity: 1 },
];

let nextId = 6;

routes.get("/cartitems", (req, res) => {
	res.json(cartitems);
});

routes.get("/cart-items", (req, res) => {
	let filteredCartItems = cartItems;
	const maxPrice = parseInt(req.query.maxPrice);
	const prefix = req.query.prefix;
	const pageSize = parseInt(req.query.pageSize);
	if (maxPrice) {
		filteredCartItems = filteredCartItems.filter(
			(item) => item.price < maxPrice
		);
	}
	if (prefix) {
		filteredCartItems = filteredCartItems.filter((item) =>
			item.product.includes(prefix)
		);
	}
	if (pageSize) {
		filteredCartItems = filteredCartItems.slice(0, pageSize);
	}
	res.json(filteredCartItems);
});

routes.post("/cartitems", (req, res) => {
	const item = req.body;
	item.id = nextId++;
	cartitems.push(item);
	res.status(201);
	res.json(item);
});

routes.put("/cartitems/:id", (req, res) => {
	res.status(200);
	res.json(item);
});

routes.delete("/cartitems/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const index = cartitems.findIndex((item) => item.id === id);
	if (index !== -1) {
		cartitems.splice(index, 1);
	} else {
		res.status(404);
		res.send("id not found");
	}
	res.status(204);
	res.send();
});

module.exports = routes;
