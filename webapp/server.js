const express = require('express');
const path = require('path');

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,'frontend', "index.html"));
});

/**
 * Start Express server.
 */
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`App is running at http://localhost:${port}`);
  console.log("\nPress CTRL+Z to stop");
});
