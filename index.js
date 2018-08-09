const app = require('./src/app');
const handleListen = require("./src/handleListen");
const port = process.env.PORT || 8080;

app.listen(port, handleListen(console.log, port));
