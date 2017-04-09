import React from 'react';
import { Card, Rating, Image, Segment } from 'semantic-ui-react';
import { Button, Header, Icon, } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import $ from 'jquery';
export default class DisplayRestaurant extends React.Component {
	constructor () {
		super();
		this.state = {
		displayRest:{},
		status:false
		}
	}
	addDB(event,data){
			var btnId=data.id;
		 $.ajax({
		 			url:"http://localhost:8080/stream/add",
					data:this.state.displayRest[data.id],
       		type: "POST",
					success:function(data){
					if(data.code==11000){
						$("#"+btnId).attr("disabled", true);
						$("#"+btnId).css('background-color','red');
						$("#"+btnId).text('Present');
						}
					else
					{
						$("#"+btnId).attr("disabled", true);
						 $("#"+btnId).text('SAVED');
						 }
					}
					})
			 }


  render(){
      const listImages =this.props.restaurantData.map((data,id) =>{
			this.state.displayRest[data.restaurant.R.res_id]={_id:data.restaurant.R.res_id,resName:data.restaurant.name,resImage:data.restaurant.featured_image,resRating:data.restaurant.user_rating.aggregate_rating,resAddress:data.restaurant.location.address,resComments:''};
			var img=data.restaurant.featured_image;
      if(!img)
        img='http://vignette3.wikia.nocookie.net/galaxylife/images/6/6d/No_image.png';
    return(
        <Card key={data.restaurant.R.res_id}>
	        <Image src={img} height="25%" />
	          <Card.Content>
	            <Card.Header>{data.restaurant.name}</Card.Header>
							<Rating icon='star' defaultRating={data.restaurant.user_rating.aggregate_rating} maxRating={5} />
	            <Card.Meta>{data.restaurant.location.address}</Card.Meta>
	      	</Card.Content>
	      	<Card.Content extra>
	          <a href={data.restaurant.url} target='_blank'><Button primary>Click Here</Button></a>
	          <Button id={data.restaurant.R.res_id} positive  onClick={this.addDB.bind(this)}>Save</Button>
					</Card.Content>
				</Card>
					)
	}
);

    return (
    <div>
			<Card.Group itemsPerRow='4'>{listImages}</Card.Group>
    </div>
    );
  }

}
//end of class
