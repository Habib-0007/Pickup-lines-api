const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3000;

app.get("/data", (req, res) => {
	fs.readFile("pickup_lines.json", "utf8", (err, data) => {
		if (err) {
			console.error(`Error reading file from disk: ${err}`);
			res.status(500).send({ error: err.message });
			return;
		}
		try {
			const parsedData = JSON.parse(data);
			res.send(parsedData);
		} catch (err) {
			console.error(`Error parsing JSON string: ${err}`);
			res.status(500).send({ error: err.message });
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
