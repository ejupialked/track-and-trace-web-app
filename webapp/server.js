const express = require('express');
const path = require('path');

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,'frontend', "index.html"));
});

const port = 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})