const express    = require('express');
const cors       = require('cors');

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initCorsMiddlware = (app) => app.use(cors());

const initLoggerMiddlware = (app) => {
	app.use((
		        req,
		        res,
		        next
	        ) => {
		const begin = new Date();
		
		res.on(
			'finish',
			() => {
				const requestDate = begin.toLocaleString();
				const remoteIP    = `IP: ${req.connection.remoteAddress}`;
				const httpInfo    = `${req.method} ${req.baseUrl || req.path}`;
				
				const end               = new Date();
				const requestDurationMs = end - begin;
				const requestDuration   = `Duration: ${requestDurationMs}ms`;
				
				console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
			}
		)
		next();
	});
};

exports.initializeConfigMiddlewares = (app) => {
	initJsonHandlerMiddlware(app);
	initCorsMiddlware(app);
	initLoggerMiddlware(app);
}

exports.initializeErrorMiddlwares = (app) => {
	app.use((
		        err,
		        req,
		        res,
		        next
	        ) => {
		res.status(500).send(err.message);
	});
}
