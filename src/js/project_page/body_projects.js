import React, { Component, useEffect } from "react";
import dashboardApi from '../API_inquiries/fetch_Inquiries.js';
import Context from '../context.js';
import dataModification from '../data_modification.js';
import handlingForm from '../handling_form.js';


function ProjectsPopup(props) {

	if(props.datasetName == 'update') {
		return (
			<div className="popup_wrapper">
				<div className="body_projects_popup">
					<div className="overlay_menu_btn_close" onClick={props.togglePopup}></div>
					<h2>Update project</h2>
					<form className="body_projects_popup_form" name="form" onClick={props.hookEvent}>
						<label>Title:<input type="text" name="title" placeholder="Dashboard API"/></label>
						<label>Company:<input type="text" name="company" placeholder="GeekHub System"/></label>
						<label>Cost:<input type="number" name="cost" placeholder="$2000.50"/></label>
						<label>Progress:<input type="number" name="progress" placeholder="100" min="0" max="100"/></label>
						<label>TimeSpent:<input type="number" name="timeSpent" placeholder="20"/></label>
						<label>Status:<select name="status">
										<option value="Development">Development</option>
										<option value="Testing">Testing</option>
										<option value="Design">Design</option>
										<option value="Queued">Queued</option>
										<option value="Completed">Completed</option>
									  </select>
						</label>

						<input type="submit" name="submit" data-id={props.idProject} data-name="btnUpdate" id="btnUpdate" value="Update"/>
					</form>
				</div>
			</div>
		);
	} else if(props.datasetName == 'createProject') {
		return (
			<div className="popup_wrapper">
				<div className="body_projects_popup">
					<div className="overlay_menu_btn_close" onClick={props.togglePopup}></div>
					<h2>Create new project</h2>
					<form className="body_projects_popup_form" name="form">
						<label>Title:<input type="text" name="title" placeholder="Dashboard API"/></label>
						<label>Company:<input type="text" name="company" placeholder="GeekHub System"/></label>
						<label>Cost:<input type="number" name="cost" placeholder="$2000.50"/></label>
						<label>Deadline:<input name="deadline" type="date"
								       defaultValue="2020-01-01"
								       min="2020-01-01" max="2030-01-01"/>
						</label>
						<input type="submit" name="submit" value="Create" onClick={props.createProject}/>
					</form>
				</div>
			</div>
		);
	} else return null;
}

function TableHeader() {
	return (
		<thead>
		<tr className="table_head">
			<th>Project title</th>
			<th>Value</th>
			<th>Deadline</th>
			<th>Time spent</th>
			<th>Progress</th>
			<th>Status</th>
			<th>Assigned to</th>
		</tr>
		</thead>
	);
}

class TableContent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return this.props.projects.map((project, index) => {
			return (
				<tbody>
				<tr className="table_content">
					<ProjectTitle title={project.title.slice(0, 15) + '...'} company={project.company} progress={project.progress}/>
					<ProjectCost cost={project.cost}/>
					<ProjectDeadline deadline={dataModification.date(project.deadline)} 
									 timeLeft={dataModification.dateLeft(project.created_at, project.deadline, project.progress)}/>
					<ProjectTimeSpent timeSpent={project.timeSpent}/>
					<ProjectProgress progress={project.progress}/>
					<ProjectStatus status={project.status}/>
					<ProjectAssigned hookEvent={this.props.hookEvent} assigned={project.assigned} 
						togglePopup={this.props.togglePopup} getIdProject={this.props.getIdProject}
						projectId={project._id} />
				</tr>	
				</tbody>
			); 
		})
	}
	
}

function ProjectTitle(props) {
	//white  #e2e3e8;

	let styles = {
		scale: {
			background: `${props.progress == 100?  '#4caf50' : 
						   props.progress == 0? '#e2e3e8' : '#2196f3'}`,
		}
	}

	return (
		<td className="project_table-item">
			<div className="color_detector_left" style={styles.scale}></div>
			<div className="project_table-item_title text_white">{props.title}</div>
			<div className="project_table-item_company text_gray">{props.company}</div>
		</td>
	);
}

function ProjectCost(props) {
	return (
		<td className="project_table-item">
			<div className="project_table-item_value text_white">{props.cost}</div>
		</td>
	);
}

function ProjectDeadline(props) {
	return (
		<td className="project_table-item">
			<div className="project_table-item_deadline text_white">{props.deadline}</div>
			<div className="project_table-item_timeLeft text_gray">{props.timeLeft}</div>
		</td>
	);
}

function ProjectTimeSpent(props) {
	return (
		<td className="project_table-item">
			<div className="project_table-item_timeSpent text_white">{props.timeSpent} hours</div>
		</td>
	);
}

function ProjectProgress(props) {

	let styles = {
		scale: {
			background: `${props.progress == 100?  '#4caf50' :  '#2196f3'}`,
			width: `${props.progress}%`
		}
	}

	return (
		<td className="project_table-item">
			<div className="project_table-item_progress">
				<div className="project_table-item_progress-percent text_white">{props.progress}%</div>
				<div className="project_table-item_progress-scale">
					<div className="project_table-item_progress-scale_before" style={styles.scale}></div>
				</div>
			</div>
		</td>
	);
}

function ProjectStatus(props) {
	return (
		<td className="project_table-item">
			<div className="project_table-item_status text_white">{props.status}</div>
		</td>
	);
}

function AssignedPopup(props) {

	return (
		<div className="project_table-item_assigned_popup" onClick={props.hookEvent}>
			<div className="project_table-item_assigned_popup_update" data-id={props.projectId} data-name="update" onClick={props.togglePopup}>Update project</div>
			<div className="project_table-item_assigned_popup_remove" 
			   data-id={props.projectId} data-name="remove">Remove project</div>
		</div>
	);
}

class ProjectAssigned extends React.Component {
	constructor(props) {
		super(props);

		this.state = {isToggleOn: false};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
	  this.setState(state => ({
	    isToggleOn: !state.isToggleOn
	  }));
	}

	render() {
		return (
			<td className="project_table-item">
				<div className="project_table-item_assigned">
					<div className="project_table-item_assigned_avatar"><img src="dist/img/messenger/avatar.png" alt="avatar" /></div>
					<div className="project_table-item_assigned_info">
						<div className="project_table-item_assigned_name text_white">{(this.props.assigned == null)? "No name" : this.props.assigned.name }</div>
						<div className="project_table-item_assigned_position text_gray">Front End Dev</div>
					</div>
					<div className="project_table-item_assigned_settings" onClick={this.handleClick}>
						<img src="dist/img/pojects/dots-vertical.png"  alt="" />
					</div>
					{this.state.isToggleOn ? <AssignedPopup hookEvent={this.props.hookEvent}
								togglePopup={this.props.togglePopup} getIdProject={this.props.getIdProject}
								projectId={this.props.projectId} /> : null}
				</div>
			</td>
		);
	}
}

function BodyProjects(props) {
		let [projects, setProjects] = React.useState([]);

		let urlProjects = 'https://geekhub-frontend-js-9.herokuapp.com/api/projects/';
		let userData;

		async function getDataOfUser() {

			let user = await dashboardApi.logIn().then(data => {
					return {
						data: data,
						token: dashboardApi.token
					}
				});
			
			return user;
		}


		async function getAllProjects() {
			let token = await getDataOfUser();
					console.log('достаем токен')
			 		console.log(token);

					let headers = {
						"x-access-token": token,
					} 	

			let projects = await fetch(urlProjects, {
				headers: headers
			}).then(response => response.json());

			console.log('получили массив проектов');
			console.log(projects);
			 return projects;
		}

		useEffect(() => {
			getAllProjects().then(data => {
				setProjects(data);
			})
		}, []);


		async function createProject(event) {
		    event.preventDefault();
			await handlingForm.getData();

			let user = await getDataOfUser();

			let headers = {
				"Content-Type": 'application/json',
			}

			let data = {
				"title": handlingForm.title,
				"company": handlingForm.company,
				"cost": handlingForm.cost,
				"deadline": handlingForm.deadline,
				"assigned": user.data._id
			}

			let newProject = await fetch(urlProjects, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: headers,
			}).then(response => response.json())
				.then(data => {
					alert(`Вы создали новый проект:
						    Title: ${data.title}
						    Company: ${data.company}
						    Status: ${data.status}`);
					return data;
				});
				let projects = await getAllProjects();
				await setProjects(projects);
			console.log('metka>project', newProject);	
		}


	return (
		<Context.Provider>
		<div className="body_projects">
			{props.showPopup? <ProjectsPopup createProject={createProject} datasetName={props.datasetName} 
			togglePopup={props.togglePopup} idProject={props.idProject} hookEvent={props.hookEvent} /> : null}
			<table className="body_projects_table" cellSpacing="0">
				<TableHeader />
				{(projects.length > 0)?  <TableContent hookEvent={props.hookEvent} projects={projects} 
					togglePopup={props.togglePopup} getIdProject={props.getIdProject}
					/> : <tbody><tr><td><h2 style={{color: 'white'}}>Loading!</h2></td></tr></tbody> }
			</table>
		</div>
		</Context.Provider> 
	);
}

export default BodyProjects;