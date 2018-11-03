const port = process.env.SERVER_PORT || 9001;
const http = require("http");
const db = require("mongoose");
const app = require("./app.js");

http.createServer(app).listen(port, () => { console.log(`Server online on port ${port}`)});

//Mongodb databas
db.connect(process.env.MONGO_DB_CONNECTIONSTRING, { useNewUrlParser: true })
	.then(() => console.log("mongodb server online"));

db.set("useCreateIndex", true);