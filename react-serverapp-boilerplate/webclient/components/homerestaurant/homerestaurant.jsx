import React from 'react';
import { Dropdown ,Segment, Header, Container, Icon, Button } from 'semantic-ui-react';
import $ from 'jquery';
import DisplayRest from './displayrestaurant';
import DisplayDB from './displaydb';
export default class HomeRestaurant extends React.Component {
	constructor () {
		super();
		this.state = {
			stateOptions:[],
			cuisineOptions:[],
			restaurantData:[],
			restaurantDB:[],
			city:0
		}
	}

	searchCity(event)
	{
  	const city=event.target.value;
    $.ajax({
			 url: "https://developers.zomato.com/api/v2.1/cities?q="+city,
			 type: "GET",
			 dataType: "json",
       headers: {  "Accept":" application/json" ,"user-key":" 22ab27ad354af2cd61ac0ec1c412ce74" },
       success:function(data){
			 		var states=[];
	        this.setState({cityId:data.location_suggestions});
					this.state.cityId.forEach(function(data){
						states.push({key:data.id,value:data.id,text:data.name});
					})
				this.setState({stateOptions:states});
										//console.log(this.state.cityId);
      }.bind(this)
		})
	}


	handleCityId(event,data){
		this.setState({city:data.value});
			$.ajax({
				url: "https://developers.zomato.com/api/v2.1/cuisines?city_id="+data.value,
				type: "GET",
				dataType: "json",
				headers: {  "Accept":" application/json" ,"user-key":" 22ab27ad354af2cd61ac0ec1c412ce74" },
				success:function(data){
					var cuisinesOpt=[];
					data.cuisines.forEach(function(cuisineData){
						cuisinesOpt.push({key:cuisineData.cuisine.cuisine_id,value:cuisineData.cuisine.cuisine_id,text:cuisineData.cuisine.cuisine_name});
				})
				this.setState({cuisineOptions:cuisinesOpt});
			}.bind(this)
		})
	}

	handleCuisineId(event,data){
	this.setState({restaurantDB:[]});
		$.ajax({
	 		url: "https://developers.zomato.com/api/v2.1/search?entity_id="+this.state.city+"&entity_type=city&cuisines="+data.value,
			type: "GET",
			dataType: "json",
			headers: {  "Accept":" application/json" ,"user-key":" 22ab27ad354af2cd61ac0ec1c412ce74" },
			success:function(data){
				this.setState({restaurantData:data.restaurants});
			}.bind(this)
		})

	}
	displayDB(){
	this.setState({restaurantData:[]});
		$.ajax({
				 url:"http://localhost:8080/stream/display",
				 type: "GET",
				 success:function(data){
				 console.log(data);
				 this.setState({restaurantDB:data});
				 }.bind(this)
				 })
			}
 handleDelete(data)
 {
 this.setState({restaurantDB:data})
 }
	render () {
		return (
			<div>
			<Segment tertiary size='huge' textAlign='center' color='red'>
					<Header as='h2' color='red'>
					<Icon name='food' color='yellow' circular/>{this.props.message}</Header>
			</Segment>
				<Dropdown placeholder='SearchCity..' search selection options={this.state.stateOptions} noResultsMessage='Try another search..' onKeyUp={this.searchCity.bind(this)} onChange={this.handleCityId.bind(this)}  />
				<Dropdown placeholder='SearchCuisine..' search selection options={this.state.cuisineOptions} noResultsMessage='Try another search..' onChange={this.handleCuisineId.bind(this)}/>
				<Button color='pink' onClick={this.displayDB.bind(this)} floated='right' size='huge'><Icon name='heart'/>Favorites</Button><br /> <br />
				<Container ><DisplayDB restaurantDB={this.state.restaurantDB} handleDelete={this.handleDelete.bind(this)}/>
				<DisplayRest restaurantData={this.state.restaurantData}/></Container>
				<br/><br/>
			</div>
		);
	}
}//end of class
