import React from 'react';
import {Menu, Input} from 'semantic-ui-react';
import {Link} from 'react-router';


export default class NavBar extends React.Component {

constructor(){
	super();
	this.state = { activeItem: 'Search' }
}


 handleItemClick = (e, { name }) => this.setState({ activeItem: name })




render(){
	const { activeItem } = this.state

	return (

		<div>
        <Menu pointing>
          <Menu.Item name='Search' active={activeItem === 'Search'} onClick={this.handleItemClick} as={Link} to="search"/>
          <Menu.Item name='Movie' active={activeItem === 'Movie'} onClick={this.handleItemClick} as={Link} to="display" />
          <Menu.Item name='Logout' active={activeItem === 'Logout'} onClick={this.handleItemClick} as={Link} to="/"/>
        </Menu>
        {this.props.children}
      </div>
		)
}


}
