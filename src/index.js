const app = require('./app');
const handleListen = require("./handleListen");
const port = process.env.PORT || 8080;

app.listen(port, handleListen(console.log, port));