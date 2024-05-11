require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const serverless = require("serverless-http");

const app = express();
const { Router } = express;
const router = Router();

const port = process.env.PORT || 5001;

app.use(express.json());

const filePath = path.join(
	__dirname,
	"pickup_lines.json"
);

router.get("/pickups", (req, res) => {
	res.set(
		"Access-Control-Allow-Origin",
		"*"
	);
	fs.readFile(
		filePath,
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

router.get(
	"/pickups/:id",
	(req, res) => {
		res.set(
			"Access-Control-Allow-Origin",
			"*"
		);
		fs.readFile(
			filePath,
			"utf8",
			(err, data) => {
				if (err) {
					console.error(
						`Error reading file from disk: ${err}`
					);
					res.status(500).send({
						error: err.message,
					});
					return;
				}
				try {
					const parsedData =
						JSON.parse(data);
					const newData =
						parsedData.find(
							data =>
								req.params.id == data.id
						);
					res.send(newData);
				} catch (err) {
					console.error(
						`Error parsing JSON string: ${err}`
					);
					res.status(500).send({
						error: err.message,
					});
				}
			}
		);
	}
);

app.use("/api", router);

app.listen(port, () => {
	console.log(
		`Server listening on port ${port}`
	);
});

module.exports.handler =
	serverless(app);
