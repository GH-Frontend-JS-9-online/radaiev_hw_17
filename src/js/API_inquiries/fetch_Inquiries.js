import handlingForm from '../handling_form.js';

class DashboardApi {
	constructor() {
		this.token = '';
		this._baseUrl = 'https://geekhub-frontend-js-9.herokuapp.com/api';
	}

	 async logIn() {
		let headers = {
			"Content-Type": "application/json",
		}

		let user = {
			email: 'hf.chelenger@gmail.com',
			password: '12345678'
		}

		return await fetch(`${this._baseUrl}/users/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: headers,
		}).then(response => {
			if(response.ok) {
				this.token = response.headers.get('x-auth-token');
				return response.json();
			}

			return response.json().then(err => {
				let e = new Error(err);
				e.data = err;
				throw e;
			})
		})
	}

	async removeProject(id) {
		let urlProjects = `https://geekhub-frontend-js-9.herokuapp.com/api/projects/${id}`;

		let headers = {
			"x-access-token": this.token,
			'Content-Type': 'application/json',
		}

		return await fetch(urlProjects, {
			method: 'DELETE',
			headers: headers,
		}).then(response => response.json());
	}

	async updateProject(id) {
		let urlProjects = `https://geekhub-frontend-js-9.herokuapp.com/api/projects/${id}`;

		let headers = {
			"x-access-token": this.token,
			'Content-Type': 'application/json',
		}

		handlingForm.getDataUpdate();
		this.title = (form.title.value).trim();
		this.company = (form.company.value).trim();
		this.cost = '$'+form.cost.value;
		this.progress = form.progress.value;
		this.timeSpent = form.timeSpent.value;
		this.status = form.status.value;

		let body = {
			"title": handlingForm.title,
			"company": handlingForm.company,
			"cost": handlingForm.cost,
			"progress": handlingForm.progress,
			"timeSpent": handlingForm.timeSpent,
			"status": handlingForm.status,
		}		

		return await fetch(urlProjects, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: headers
		}).then(response => response.json())
	}
}

// === тес использования сесионного хранилища
async function logInUser() {
	let log = await new DashboardApi();

	let user = await log.logIn().then(data => {
			console.log(data)
			console.log(log.token)
			return user = {
				data: data,
				token: log.token
			}
		});

	await sessionStorage.setItem('user', JSON.stringify(user) )
 //console.log( JSON.parse(sessionStorage.user) )
}

//logInUser();

async function getAllProjects() {
	let urlProjects = 'https://geekhub-frontend-js-9.herokuapp.com/api/projects/';

	let user = JSON.parse(sessionStorage.user)

	let headers = {
		"x-access-token": user.token
	}

	return await fetch(urlProjects, {
		headers: headers
	}).then(response => response.json())
}

//getAllProjects().then(data => console.log(data))

let dashboardApi = new DashboardApi();
export default dashboardApi;
