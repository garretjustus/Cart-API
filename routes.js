const express = require("express");
const e = require("express");
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
	if (req.query.maxPrice) {
		let filteredArray = items.filter((item) => {
			return item.price <= parseFloat(req.query.maxPrice);
		});
		res.json(filteredArray);
	} else if (req.query.prefix) {
		filteredArray = items.filter((item) => {
			let currentItem = item.product.toLowerCase();
			return currentItem.startsWith(req.query.prefix.toLowerCase());
		});
		res.json(filteredArray);
	} else if (req.query.pageSize) {
		let results = items.slice(0, parseInt(req.query.pageSize));
		res.json(results);
	} else {
		res.status(200);
		res.json(items);
	}
});

routes.get("/cartitems/:id", (req, res) => {
	let id = parseInt(req.params.id);
	let found = items.find((item) => {
		return item.id === id;
	});
	if (found) {
		res.json(found);
		res.status(200);
	} else {
		res.status(404);
		res.send(`ID: ${id} not found`);
	}
});

routes.post("/cartitems", (req, res) => {
	const item = req.body;
	item.id = nextId++;
	cartitems.push(item);
	res.status(201);
	res.json(item);
});

routes.put("/cartitems/:id", (req, res) => {
	let id = parseInt(req.params.id);
	let index = items.findIndex((item) => {
		return item.id === id;
	});
	items[index] = req.body;
	items[index].id = id;
	res.status(200);
	res.json(items[index]);
});

routes.delete("/cartitems/:id", (req, res) => {
	let id = req.params.id;
	let index = items.findIndex((item) => {
		item.id === id;
		return item.id === id;
	});
	items.splice(index, 1);
	res.status(204);
	res.json();
});

module.exports = routes;
