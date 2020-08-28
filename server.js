"use strict";

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);
app.use(express.json());
const port = 3001;
app.listen(port, () => {
	console.log(`Listening on port: ${port}.`);
});
