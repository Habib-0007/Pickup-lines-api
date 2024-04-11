require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

app.get("/pickups", (req, res) => {
	res.set(
		"Access-Control-Allow-Origin",
		"*"
	);
	fs.readFile(
		"pickup_lines.json",
		"utf8",
		(err, data) => {
			if (err) {
				console.error(
					`Error reading file from disk: ${err}`
				);
				res
					.status(500)
					.send({ error: err.message });
				return;
			}
			try {
				const parsedData =
					JSON.parse(data);
				res.send(parsedData);
				console.log(parsedData);
			} catch (err) {
				console.error(
					`Error parsing JSON string: ${err}`
				);
				res
					.status(500)
					.send({ error: err.message });
			}
		}
	);
});

app.get("/pickups/:id", (req, res) => {
	res.set(
		"Access-Control-Allow-Origin",
		"*"
	);
	fs.readFile(
		"pickup_lines.json",
		"utf8",
		(err, data) => {
			if (err) {
				console.error(
					`Error reading file from disk: ${err}`
				);
				res
					.status(500)
					.send({ error: err.message });
				return;
			}
			try {
				const parsedData =
					JSON.parse(data);
				const newData = parsedData.find(
					data => req.params.id == data.id
				);
				res.send(newData);
			} catch (err) {
				console.error(
					`Error parsing JSON string: ${err}`
				);
				res
					.status(500)
					.send({ error: err.message });
			}
		}
	);
});

app.listen(port, () => {
	console.log(
		`Server listening on port ${port}`
	);
});
