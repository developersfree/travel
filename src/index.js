const express = require("express");
const morgan = require("morgan");   //logging
const helmet = require("helmet");   //for secure helmet
const cors = require("cors");       //cross origin resource sharing
require('dotenv').config();
const middlewares = require("./middlewares");
const mongoose = require("mongoose");
const logs = require("./api/logs");

const app = express();

mongoose.connect(process.env.DATABASE_URL,{
	useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> {
		console.log("mongodb connected");
	}).catch(err => {
		console.log("there was error connecting to database");
		console.error(err);
			})

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
	origin: process.env.CORS_ORIGIN,
}));


app.get('/',(req,res)=> {
	res.json({
		message: 'Hello world',
	});
})

app.use('/api/logs',logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);


const port = process.env.PORT || 1337;

app.listen(port,()=> {
	console.log(`app is working at localhost ${port}`);
});
