import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Sample2 from './sample2';

export default class Sample extends React.Component {
	constructor () {
		super();
		this.state = {
			name:'',
			name2:''
		}
	}

	handleNameState (event) {
		this.setState({ name: event.target.value });
		console.log( event.target.value);
	}

	changeTitle (abc) {
		this.setState({ name2:abc });

	}

	render () {
		return (
			<div>
				<h1>Hello {this.state.name2}</h1>
				<TextField floatingLabelText="Name" onChange={this.handleNameState.bind(this)} value={this.state.name}/>
				<br/>
				<Sample2 name={this.state.name} changeTitle={this.changeTitle.bind(this)}/>
			</div>
		);
	}
}//end of class
