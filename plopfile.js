export default function ( plop ) {
	plop.setWelcomeMessage( " === Framework MAWork === \n" +
	                        "Sélectionnez les éléments que vous voulez générer." );
	plop.setGenerator(
		"Projet",
		{
			actions : [
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
				}
			
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
		"MVC",
		{
			actions : [
				{
					path         : `${ process.cwd() }/front/app/services/{{ camelCase controllerName }}Api.js`,
					skipIfExists : true,
					templateFile : "src/commands/controller/ControllerApi.js.hbs",
					type         : "add"
				},
				{
					path         : `${ process.cwd() }/front/views/{{ camelCase controllerName }}.html`,
					skipIfExists : true,
					templateFile : "src/commands/controller/ControllerView.html.hbs",
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
					path         : `${ process.cwd() }/front/res/css/{{ camelCase controllerName }}Stylesheet.scss`,
					skipIfExists : true,
					templateFile : "src/commands/controller/ControllerStylesheet.scss",
					type         : "add"
				},
				{
					path     : `${ process.cwd() }/front/index.html`,
					pattern  : /(<!-- MAWORK CLI API NE PAS TOUCHER -->)/g,
					template : "<script type=\"application/ecmascript\" src=\"app/services/{{ camelCase controllerName }}Api.js\"></script>",
					type     : "append"
				},
				{
					path     : `${ process.cwd() }/front/index.html`,
					pattern  : /(<!-- MAWORK CLI MODEL NE PAS TOUCHER -->)/g,
					template : "<script type=\"application/ecmascript\" src=\"app/model/{{ camelCase controllerName }}Model.js\"></script>",
					type     : "append"
				},
				{
					path     : `${ process.cwd() }/front/res/css/index.scss`,
					pattern  : /(\/\/ MAWORK CLI SCSS IMPORTER NE PAS TOUCHER)/g,
					template : "@import \"{{ camelCase controllerName }}Stylesheet\";",
					type     : "append"
				}
			],
			description : "Contrôleur pour l'application Client de votre application MAWork",
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
		"Route",
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
					path         : `${ process.cwd() }/back/tests/{{ camelCase routeName }}.test.js`,
					skipIfExists : true,
					templateFile : "src/commands/routes/route.test.js.hbs",
					type         : "add"
				},
				{
					path     : `${ process.cwd() }/back/src/core/web-server.js`,
					pattern  : /(\/\/ MAWORK CLI Import NE PAS TOUCHER)/g,
					template : "const {{camelCase routeName}} = require( \"../controllers/{{camelCase routeName}}.routes\" );",
					type     : "append"
				},
				{
					path     : `${ process.cwd() }/back/src/core/web-server.js`,
					pattern  : /(\/\/ MAWORK CLI NE PAS TOUCHER)/g,
					template : "this.app.use( \"/{{camelCase routeName}}\", {{camelCase routeName}}.initializeRoutes() );",
					type     : "append"
				}
			],
			description : "Route pour l'application Serveur de votre application MAWork",
			prompts     : [
				{
					message : "Nom de la route :",
					name    : "routeName",
					type    : "input"
				}
			]
		}
	);
	
	plop.setGenerator(
		"Association",
		{
			actions     : function ( data ) {
				let actions = [];
				
				actions.push(
					{
						path     : `${ process.cwd() }/back/src/models/{{ camelCase firstEntityName }}.model.js`,
						pattern  : /(\/\/ MAWORK CLI AJOUT IMPORT NE PAS TOUCHER)/g,
						template : "const {{pascalCase secondEntityName}} = require( \"./{{ camelCase secondEntityName }}.model\" );",
						type     : "append"
					},
				);
				
				switch ( data.associationType ) {
					case "oneToOne": {
						actions.push(
							{
								path     : `${ process.cwd() }/back/src/models/{{ camelCase firstEntityName }}.model.js`,
								pattern  : /(\/\/ MAWORK CLI AJOUT MODEL NE PAS TOUCHER)/g,
								template : "{{pascalCase secondEntityName}}.hasOne( {{pascalCase firstEntityName}} );\n" +
								           "{{pascalCase firstEntityName}}.belongsTo( {{pascalCase secondEntityName}} );",
								type     : "append"
							},
						);
						break;
					}
					case "oneToMany": {
						actions.push(
							{
								path     : `${ process.cwd() }/back/src/models/{{ camelCase firstEntityName }}.model.js`,
								pattern  : /(\/\/ MAWORK CLI AJOUT MODEL NE PAS TOUCHER)/g,
								template : "{{pascalCase secondEntityName}}.hasMany( {{pascalCase firstEntityName}} );\n" +
								           "{{pascalCase firstEntityName}}.belongsTo( {{pascalCase secondEntityName}} );",
								type     : "append"
							},
						);
						break;
					}
					case "ManyToMany": {
						actions.push(
							{
								path     : `${ process.cwd() }/back/src/models/{{ camelCase firstEntityName }}.model.js`,
								pattern  : /(\/\/ MAWORK CLI AJOUT MODEL NE PAS TOUCHER)/g,
								template : "{{pascalCase firstEntityName}}.belongsToMany( {{pascalCase secondEntityName}}, {through: {{camelCase firstEntityName}}{{pascalCase secondEntityName}}} );",
								type     : "append"
							},
						);
						break;
					}
				}
				return actions;
			},
			description : "Association de deux entités définies dans le back de votre application MAWork",
			prompts     : [
				{
					message : "Type d'association :",
					name    : "associationType",
					type    : "list",
					choices : [
						{
							name  : "One-To-One",
							value : "oneToOne"
						},
						{
							name  : "One-To-Many",
							value : "oneToMany"
						},
						{
							name  : "Many-To-Many",
							value : "manyToMany"
						}
					]
				},
				{
					message : "Nom de la première entité :",
					name    : "firstEntityName",
					type    : "input"
				},
				{
					message : "Nom de la seconde entité :",
					name    : "secondEntityName",
					type    : "input"
				}
			]
		}
	);
}