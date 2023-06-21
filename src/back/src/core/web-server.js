const express        = require('express');
const {
	      initializeConfigMiddlewares,
	      initializeErrorMiddlwares
      }              = require('./middlewares');

// MAWORK CLI IMPORTER NE PAS TOUCHER


class WebServer {
	app    = undefined;
	port   = 3000;
	server = undefined;
	
	constructor() {
		this.app = express();
		
		initializeConfigMiddlewares(this.app);
		this._initializeRoutes();
		initializeErrorMiddlwares(this.app);
	}
	
	start() {
		this.server = this.app.listen(
			this.port,
			() => {
				console.log(`Example app listening on port ${this.port}`);
			}
		);
	}
	
	stop() {
		this.server.close();
	}
	
	_initializeRoutes() {
		// MAWORK CLI NE PAS TOUCHER
	}
}

module.exports = WebServer;