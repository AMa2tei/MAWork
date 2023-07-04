import * as fs            from "fs";
import autocompletePrompt from "inquirer-autocomplete-prompt";

export default function (plop) {
	plop.setPrompt("autocomplete", autocompletePrompt);
	plop.setWelcomeMessage(" === Framework MAWork === \n" +
		"Sélectionnez les éléments que vous voulez générer.");
	plop.setGenerator(
		"Projet",
		{
			description: "Framework MAWork",
			prompts    : [
				{
					message: "Nom du projet :",
					name   : "name",
					type   : "input"
				}
			],
			actions    : [
				{
					base         : "src/front",
					destination  : `${process.cwd()}/{{ pascalCase name }}/front`,
					skipIfExists : true,
					templateFiles: "src/front",
					type         : "addMany"
				},
				{
					base         : "src/back",
					destination  : `${process.cwd()}/{{ pascalCase name }}/back`,
					skipIfExists : true,
					templateFiles: "src/back",
					type         : "addMany"
				}
			]
		}
	);

	plop.setGenerator(
		"MVC",
		{
			actions    : [
				{
					path        : `${process.cwd()}/front/app/services/{{ camelCase controllerName }}Api.js`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerApi.js.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/front/views/{{ camelCase controllerName }}.html`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerView.html.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/front/app/controllers/{{ camelCase controllerName }}Controller.js`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerController.js.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/front/app/model/{{ camelCase controllerName }}Model.js`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerModel.js.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/front/res/css/{{ camelCase controllerName }}Stylesheet.scss`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerStylesheet.scss",
					type        : "add"
				},
				{
					path    : `${process.cwd()}/front/index.html`,
					pattern : /(<!-- MAWORK CLI API NE PAS TOUCHER -->)/g,
					template: "<script type=\"application/ecmascript\" src=\"app/services/{{ camelCase controllerName }}Api.js\"></script>",
					type    : "append"
				},
				{
					path    : `${process.cwd()}/front/index.html`,
					pattern : /(<!-- MAWORK CLI MODEL NE PAS TOUCHER -->)/g,
					template: "<script type=\"application/ecmascript\" src=\"app/model/{{ camelCase controllerName }}Model.js\"></script>",
					type    : "append"
				},
				{
					path    : `${process.cwd()}/front/res/css/index.scss`,
					pattern : /(\/\/ MAWORK CLI SCSS IMPORTER NE PAS TOUCHER)/g,
					template: "@import \"{{ camelCase controllerName }}Stylesheet\";",
					type    : "append"
				}
			],
			description: "Contrôleur pour l’application Client de votre application MAWork",
			prompts    : [
				{
					type   : "input",
					name   : "controllerName",
					message: "Nom du contrôleur :"
				}
			]
		}
	);

	plop.setGenerator(
		"Vue",
		{
			actions    : [
				{
					path        : `${process.cwd()}/front/views/{{ camelCase controllerName }}.html`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerView.html.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/front/app/controllers/{{ camelCase controllerName }}Controller.js`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerController.js.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/front/res/css/{{ camelCase controllerName }}Stylesheet.scss`,
					skipIfExists: true,
					templateFile: "src/commands/controller/ControllerStylesheet.scss",
					type        : "add"
				},
				{
					path    : `${process.cwd()}/front/res/css/index.scss`,
					pattern : /(\/\/ MAWORK CLI SCSS IMPORTER NE PAS TOUCHER)/g,
					template: "@import \"{{ camelCase controllerName }}Stylesheet\";",
					type    : "append"
				}
			],
			description: "Vue pour l’application Client de votre application MAWork",
			prompts    : [
				{
					type   : "input",
					name   : "controllerName",
					message: "Nom de la vue :"
				}
			]
		}
	);

	plop.setGenerator(
		"Route",
		{
			actions    : [
				{
					path        : `${process.cwd()}/back/src/controllers/{{ camelCase routeName }}.routes.js`,
					skipIfExists: true,
					templateFile: "src/commands/routes/route.routes.js.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/back/src/models/{{ camelCase routeName }}.model.js`,
					skipIfExists: true,
					templateFile: "src/commands/routes/route.model.js.hbs",
					type        : "add"
				},
				{
					path        : `${process.cwd()}/back/tests/{{ camelCase routeName }}.test.js`,
					skipIfExists: true,
					templateFile: "src/commands/routes/route.test.js.hbs",
					type        : "add"
				},
				{
					path    : `${process.cwd()}/back/src/core/web-server.js`,
					pattern : /(\/\/ MAWORK CLI IMPORTER NE PAS TOUCHER)/g,
					template: "const {{camelCase routeName}} = require( \"../controllers/{{camelCase routeName}}.routes\" );",
					type    : "append"
				},
				{
					path    : `${process.cwd()}/back/src/core/web-server.js`,
					pattern : /(\/\/ MAWORK CLI NE PAS TOUCHER)/g,
					template: "this.app.use( \"/{{camelCase routeName}}\", {{camelCase routeName}}.initializeRoutes() );",
					type    : "append"
				}
			],
			description: "Route pour l’application Serveur de votre application MAWork",
			prompts    : [
				{
					message: "Nom de la route :",
					name   : "routeName",
					type   : "input"
				}
			]
		}
	);

	plop.setGenerator(
		"Entité",
		{
			actions    : [
				{
					path        : `${process.cwd()}/back/src/models/{{ camelCase entiteName }}.model.js`,
					skipIfExists: true,
					templateFile: "src/commands/routes/route.model.js.hbs",
					type        : "add"
				}
			],
			description: "Entité pour l’application Serveur de votre application MAWork",
			prompts    : [
				{
					message: "Nom de l'entité :",
					name   : "entiteName",
					type   : "input"
				}
			]
		}
	);

	plop.setGenerator(
		"Champ",
		{
			actions    : [
				{
					path    : `${process.cwd()}/back/src/models/{{ camelCase entiteName }}.model.js`,
					pattern : /(\/\/ MAWORK CLI AJOUT CHAMP NE PAS TOUCHER)/g,
					template: "\t\t{{camelCase champName}}: {\n\t\t\ttype: DataTypes.{{type}},\n\t\t\trequired: {{required}}\n\t\t},",
					type    : "append"
				}
			],
			description: "Champ pour l’application Serveur de votre application MAWork",
			prompts    : [
				{
					message: "Nom de l'entité :",
					name   : "entiteName",
					type   : "autocomplete",
					source : function (answersSoFar, input) {
						return new Promise(function (resolve) {
							let entites = fs.readdirSync(`${process.cwd()}/back/src/models`).filter(file => file !== "index.js").filter(file => file !== "db.js").map(file => file.split(".")[0]);
							resolve(entites);
						});
					}
				},
				{
					message: "Nom du champ :",
					name   : "champName",
					type   : "input"
				},
				{
					message: "Type du champ :",
					name   : "type",
					type   : "autocomplete",
					source : function (answersSoFar, input) {
						return new Promise(function (resolve) {
							let types = [
								"BigInt",
								"Binary",
								"Boolean",
								"Date",
								"DateOnly",
								"Decimal",
								"Double",
								"Float",
								"Integer",
								"String",
								"Text",
								"UUID"
							];
							resolve(types);
						});
					}
				},
				{
					message: "Champ requis ?",
					name   : "required",
					type   : "confirm"
				}
			]
		}
	);

	plop.setGenerator(
		"Association",
		{
			actions: function (data) {
				let actions = [];

				actions.push(
					{
						path    : `${process.cwd()}/back/src/models/{{ camelCase firstEntityName }}.model.js`,
						pattern : /(\/\/ MAWORK CLI AJOUT IMPORT NE PAS TOUCHER)/g,
						template: "const {{pascalCase secondEntityName}} = require( \"./{{ camelCase secondEntityName }}.model\" );",
						type    : "append"
					}
				);

				switch (data.associationType) {
					case "oneToOne": {
						actions.push(
							{
								path: `${process.cwd()}/back/src/models/{{ camelCase firstEntityName }}.model.js`,
								pattern: /(\/\/ MAWORK CLI AJOUT ASSOCIATIONS NE PAS TOUCHER)/g,
								template: "{{pascalCase firstEntityName}}.hasOne( {{pascalCase secondEntityName}} );\n" +
									"{{pascalCase secondEntityName}}.belongsTo( {{pascalCase firstEntityName}} );",
								type: "append"
							}
						);
						break;
					}
					case "oneToMany": {
						actions.push(
							{
								path    : `${process.cwd()}/back/src/models/{{ camelCase firstEntityName }}.model.js`,
								pattern : /(\/\/ MAWORK CLI AJOUT ASSOCIATIONS NE PAS TOUCHER)/g,
								template: "{{pascalCase firstEntityName}}.hasMany( {{pascalCase secondEntityName}} );\n" +
									"{{pascalCase secondEntityName}}.belongsTo( {{pascalCase firstEntityName}} );",
								type    : "append"
							}
						);
						break;
					}
					case "ManyToMany": {
						actions.push(
							{
								path    : `${process.cwd()}/back/src/models/{{ camelCase firstEntityName }}.model.js`,
								pattern : /(\/\/ MAWORK CLI AJOUT ASSOCIATIONS NE PAS TOUCHER)/g,
								template: "{{pascalCase secondEntityName}}.belongsToMany( {{pascalCase firstEntityName}}, {through: {{camelCase firstEntityName}}{{pascalCase secondEntityName}}} );",
								type    : "append"
							}
						);
						break;
					}
				}
				return actions;
			},
			description: "Association de deux entités définies dans le back de votre application MAWork",
			prompts    : [
				{
					message: "Type d'association :",
					name   : "associationType",
					type   : "list",
					choices: [
						{
							name : "One-To-One (la première entité peut contenir une seule instance de la seconde entité et vice-versa)",
							value: "oneToOne"
						},
						{
							name : "One-To-Many (la première entité peut contenir plusieurs instances de la seconde entité mais la seconde entité ne peut contenir qu'une seule instance de la première entité)",
							value: "oneToMany"
						},
						{
							name : "Many-To-Many (la première entité peut contenir plusieurs instances de la seconde entité et vice-versa. Une table de jointure entre les deux entités est automatiquement créée)",
							value: "manyToMany"
						}
					]
				},
				{
					message: "Nom de la première entité :",
					name: "firstEntityName",
					type: "autocomplete",
					source: function (answersSoFar, input) {
						return new Promise(
							function (resolve) {
								// We filter the files to get only the models
								const entities = [];
								fs.readdirSync(`${process.cwd()}/back/src/models`).forEach(
									function (file) {
										if (file !== "index.js" && file !== "db.js") {
											entities.push(file.replace(".model.js", ""));
											// It can't be the same entity as the seconde one, so we add it to the answersSoFar
											answersSoFar.firstEntityName = file.replace(".model.js", "");
										}
									}
								);
								resolve(entities);
							}
						);
					}
				},
				{
					message: "Nom de la seconde entité :",
					name: "secondEntityName",
					type: "autocomplete",
					source: function (answersSoFar, input) {
						// It can't be the same entity as the first one
						const firstEntityName = answersSoFar.firstEntityName;
						const entities = [];
						fs.readdirSync(`${process.cwd()}/back/src/models`).forEach(
							function (file) {
								if (file !== "index.js" && file !== "db.js" && file.replace(".model.js", "") !== firstEntityName) {
									entities.push(file.replace(".model.js", ""));
								}
							}
						);
						return entities;
					}
				}
			]
		}
	);
}