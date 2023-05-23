export default function ( plop ) {
	plop.setGenerator(
		"project",
		{
			actions     : [
				{
					base          : "src/front",
					destination   : `${ process.cwd() }/{{ pascalCase name }}/front`,
					skipIfExists  : true,
					templateFiles : "src/front",
					type          : "addMany"
				},
				{
					base          : "src/back",
					destination   : `${ process.cwd() }/{{ pascalCase name }}/back`,
					skipIfExists  : true,
					templateFiles : "src/back",
					type          : "addMany"
				},
			
			],
			description : "Framework MAWork",
			prompts     : [
				{
					message : "Nom du projet :",
					name    : "name",
					type    : "input"
				}
			]
		}
	);
	
	plop.setGenerator(
		"controller",
		{
			actions     : [
				{
					path         : `${ process.cwd() }/front/app/services/{{ camelCase controllerName }}Api.js`,
					skipIfExists : true,
					templateFile : "src/commands/controller/ControllerApi.js.hbs",
					type         : "add"
				},
				{
					path         : `${ process.cwd() }/front/app/controllers/{{ camelCase controllerName }}Controller.js`,
					skipIfExists : true,
					templateFile : "src/commands/controller/ControllerController.js.hbs",
					type         : "add"
				},
				{
					path         : `${ process.cwd() }/front/app/model/{{ camelCase controllerName }}Model.js`,
					skipIfExists : true,
					templateFile : "src/commands/controller/ControllerModel.js.hbs",
					type         : "add"
				},
				{
					path     : `${ process.cwd() }/front/index.html`,
					pattern  : /(<!-- MAWORK CLI API NE PAS TOUCHER -->)/g,
					template : "<script type=\"application/ecmascript\" src=\"app/services/{{ camelCase controllerName }}Api.js\"></script>",
					type     : "append",
				},
				{
					path     : `${ process.cwd() }/front/index.html`,
					pattern  : /(<!-- MAWORK CLI MODEL NE PAS TOUCHER -->)/g,
					template : "<script type=\"application/ecmascript\" src=\"app/model/{{ camelCase controllerName }}Model.js\"></script>",
					type     : "append",
				}
			],
			description : "Contrôleur pour le front de votre application MAWork",
			prompts     : [
				{
					type    : "input",
					name    : "controllerName",
					message : "Nom du contrôleur :"
				}
			]
		}
	);
	
	plop.setGenerator(
		"route",
		{
			actions     : [
				{
					path         : `${ process.cwd() }/back/src/controllers/{{ camelCase routeName }}.routes.js`,
					skipIfExists : true,
					templateFile : "src/commands/routes/route.routes.js.hbs",
					type         : "add"
				},
				{
					path         : `${ process.cwd() }/back/src/models/{{ camelCase routeName }}.model.js`,
					skipIfExists : true,
					templateFile : "src/commands/routes/route.model.js.hbs",
					type         : "add"
				},
				{
					path         : `${ process.cwd() }/back/tests/{{ camelCase routeName }}.model.js`,
					skipIfExists : true,
					templateFile : "src/commands/routes/route.test.js.hbs",
					type         : "add"
				},
				{
					path     : `${ process.cwd() }/back/src/core/web-server.js`,
					pattern  : /(\/\/ MAWORK CLI NE PAS TOUCHER)/g,
					template : "this.app.use( \"/{{camelCase routeName}}\", userRoutes.initializeRoutes() );",
					type     : "append",
				}
			],
			description : "Route pour le back de votre application MAWork",
			prompts     : [
				{
					message : "Nom de la route :",
					name    : "routeName",
					type    : "input"
				}
			]
		}
	);
}