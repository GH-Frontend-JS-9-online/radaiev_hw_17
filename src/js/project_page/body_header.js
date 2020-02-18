import React, { Component } from "react";


function BodyHeaderWidget(props) {
	return (
		<div className="body_header_widget" onClick={props.hookEvent}>
			<div className="body_header_widget_inbox item"><button onClick={props.colback}>All Projects ({props.amount})</button></div>
			<div className="body_header_widget_sent item"><button>Workflow</button></div>
			<div className="body_header_widget_createProject item"><button data-name="createProject" onClick={props.togglePopup} >Create project</button></div>
		</div>
	);
}

function BodyHeaderFilter() {
	return (
		<div className="body_header_filter">
			<span>Show projects:</span>
			<button>All<img src="dist/img/widget/chevron-down_(1).png" alt="btn" /></button>
		</div>
	);
}

class BodyHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {amount: '388'};
		this.hendlerCount = this.hendlerCount.bind(this);
	}

	hendlerCount(event) {
		this.setState((data) => {
			return data.amount = +data.amount + 1
		})
	}
	render() {
		return (
			<div className="body_header">
				<BodyHeaderWidget hookEvent={this.props.hookEvent} amount={this.state.amount} colback={this.hendlerCount} togglePopup={this.props.togglePopup}/>
				<BodyHeaderFilter />
			</div>
		);
	}
}



export default 	BodyHeader;	