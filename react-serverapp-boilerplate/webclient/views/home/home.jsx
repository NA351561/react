import React from 'react';

import HomeRestaurant from '../../components/homerestaurant';

//This is a view layout, hence avoid putting any business logic
export default class Home extends React.Component {
	render () {
		return <HomeRestaurant message='Foodies'></HomeRestaurant>
	}
}
