import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
export default class Sample2 extends React.Component {
	constructor () {
		super();
		this.state = {
			name:''
		}
	}
	handleNameState (event) {

		this.props.changeTitle(event.target.value);
		//this.setState({ name2:event.target.value});


	}


	render () {
		return (
			<div>
			<h1> Sample2 {this.props.name}</h1>
				<TextField floatingLabelText="Name" onChange={this.handleNameState.bind(this)} />
				<br/>
			</div>
		);
	}
}//end of class
  ``
