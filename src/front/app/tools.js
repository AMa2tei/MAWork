function $(
	selector,
	f
) {
	if (f === undefined) {
		return document.querySelector(selector);
	} else {
		document.querySelectorAll(selector)
		        .forEach(f);
	}
}

const methods = {
	post  : "POST",
	put   : "PUT",
	delete: "DELETE",
	get   : "GET"
};

function fetchJSON(
	api,
	method,
	url,
	token,
	body
) {
	window.document.body.style.cursor = "wait";
	const headers                     = new Headers();
	if (token !== undefined) {
		headers.append(
			"Authorization",
			`Bearer ${token}`
		);
	}
	if (method === "GET") {
		return new Promise((
			                   resolve,
			                   reject
		                   ) => {
			fetch(
				`${api}/${url}`,
				{
					cache  : "no-cache",
					headers: headers
				}
			)
				.then(async r => {
					window.document.body.style.cursor = "auto";
					if (r.status < 200 || r.status > 299) {
						const error = await r.json();
						console.error(error);
						reject(error);
					} else {
						resolve(r.json());
					}
				})
				.catch(err => reject(err));
		});
	} else {
		headers.append(
			"Accept",
			`application/json`
		);
		headers.append(
			"Content-Type",
			`application/json`
		);
		return new Promise((
			                   resolve,
			                   reject
		                   ) => {
			fetch(
				`${api}/${url}`,
				{
					method : method,
					cache  : "no-cache",
					headers: headers,
					body   : JSON.stringify(body)
				}
			)
				.then(async r => {
					window.document.body.style.cursor = "auto";
					if (r.status < 200 || r.status > 299) {
						const error = await r.json();
						console.error(error);
						reject(error);
					} else {
						resolve(r.json());
					}
				})
				.catch(
					err => reject(err)
				);
		});
	}

}

function include(
	selector,
	url,
	urlcontroller
) {
	fetch( url,
	       { cache : "no-cache" } )
		.then( res => res.text() )
		.then( html => {
			$( `#${ selector }` ).innerHTML = html;
			fetch(
				urlcontroller,
				{ cache : "no-cache" }
			)
				.then( res => res.text() )
				.then(js => {
					eval(js);
				});
		})
		.catch(function (err) {
			console.log(
				"Failed to fetch page: ",
				err
			);
		});
}

function navigate(
	view,
	params
) {
	include(
		"content",
		`views/${view}.html`,
		`app/controllers/${view}.js`
	);
	if (params !== undefined) {
		for (let key in
			params) {
			window[key] = params[key];
		}
	}
}

function getNavParamsByName(name) {
	return window[name];
}
