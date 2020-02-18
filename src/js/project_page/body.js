import React, { Component } from "react";
import BodyHeader from './body_header.js';
import BodyProjects from './body_projects.js';
import dashboardApi from '../API_inquiries/fetch_Inquiries.js';

class ProjectBody extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isToggleOn: false,
			datasetName: '',
			idProject: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.hookEvent = this.hookEvent.bind(this);
	}

	handleClick() {
	  this.setState(state => ({
	    isToggleOn: !state.isToggleOn
	  }));
	}

	async hookEvent(event) {

		if(event.target.dataset.name == 'remove') {
			dashboardApi.removeProject(event.target.dataset.id)
			.then(data => {
				alert('Проект удалён.');
				console.log(data);
			});
		} else if(event.target.dataset.name == 'btnUpdate') {
			event.preventDefault();
			console.log('btn', event.target.dataset.id)
			dashboardApi.updateProject(event.target.dataset.id)
			.then(data => {
				alert(`Проект успешно обновлен.`);
				console.log(data);
			}).then(() => {
				this.setState(state => ({
				  isToggleOn: !state.isToggleOn
				}));
			})

		} else if(event.target.dataset.name == 'createProject') {
			this.setState({datasetName: event.target.dataset.name});
		} else if(event.target.dataset.name == 'update') {
			this.setState({datasetName: event.target.dataset.name});
			this.setState({idProject: event.target.dataset.id})
		}
		console.log('metka',event.target.dataset.name)
	}

	getIdProject(event) {
		console.log(event.target)
	}


	render() {
		return (
			<div>
				<BodyHeader hookEvent={this.hookEvent} togglePopup={this.handleClick}/>
				<BodyProjects datasetName={this.state.datasetName} 
						hookEvent={this.hookEvent} showPopup={this.state.isToggleOn} 
						togglePopup={this.handleClick} getIdProject={this.getIdProject}
						idProject={this.state.idProject}/>
			</div>
		);
	}
}

export default ProjectBody;