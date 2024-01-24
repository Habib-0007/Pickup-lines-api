const express = require("express");
const fs = require("fs/promises");

const app = express();
const PORT = 3000;

app.get("/api/data", async (req, res) => {
	try {
		// Read the JSON file
		const jsonData = await fs.readFile("pickup_lines.json", "utf-8");

		// Parse JSON data
		const parsedData = JSON.parse(jsonData);

		// Send the data as a response
		res.json(parsedData);
	} catch (error) {
		console.error("Error reading JSON file:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
