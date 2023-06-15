import MyModel from "../model/model.js";

class IndexController
	extends BaseController {
	constructor() {
		super();
		this.model = new MyModel();
	}
	
	sayHello() {
		this.toast( "bonjourToast" );
	}
}

window.indexController = new IndexController();
