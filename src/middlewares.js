const notFound = (req,res,next) => {               //404 status code
	const error = new Error(`not Found-${req.originalUrl}`);
	res.status(404);
	next(error);
}

const errorHandler = (error,req,res,next) => {            //error handler middleware
	const statusCode = res.statusCode===200?500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV==='production'?'this is production':error.stack
		
	});

};

module.exports = {
	notFound,
	errorHandler
}