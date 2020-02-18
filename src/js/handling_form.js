class HandlingForm {
	constructor() {
		this.title = '';
		this.company = '';
		this.cost = '';
		this.deadline = '';
		this.status = '';
		this.progress = '';
		this.timeSpent = '';
	}

	getData() {
		this.title = (form.title.value).trim();
		this.company = (form.company.value).trim();
		this.cost = '$'+form.cost.value;
		this.deadline = form.deadline.value;
	}

	getDataUpdate() {
		this.title = (form.title.value).trim();
		this.company = (form.company.value).trim();
		this.cost = '$'+form.cost.value;
		this.progress = form.progress.value;
		this.timeSpent = form.timeSpent.value;
		this.status = form.status.value;
	}
}

let handlingForm = new HandlingForm();
export default handlingForm;
