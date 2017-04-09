import React from 'react';
import { Card, Rating, Image, Segment } from 'semantic-ui-react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Form, TextArea } from 'semantic-ui-react';
import $ from 'jquery';
export default class DisplayDB extends React.Component {
	constructor () {
		super();
		this.state = {
			displayRestDB:{},
			comments:{},
			restaurantDB:[]
		}
	}


			 deleteDB(event,data){

		 		 $.ajax({
		 		 			url:"http://localhost:8080/stream/delete",
		 					data:{_id:data.id},
		        	type: "DELETE",
		 					success:function(data){
								$.ajax({
										 url:"http://localhost:8080/stream/display",
										 type: "GET",
										 success:function(data){
										 this.props.handleDelete(data);
										 }.bind(this)
										 })


		 					}.bind(this)
		 					})
		 			 }
				 comments(event,data){
					 console.log(data);
					 var comm=this.state.comments;
					 comm[data.id]=data.value
					 this.setState({comments:comm});
					 }
					 updateDB(event,data){
				 		 console.log(this.state.comments);
						 var btnId=data.id;
						 if(this.state.comments[data.id+'textArea'])
						 	$.ajax({
				 		 			url:"http://localhost:8080/stream/update",
				 					data:{_id:data.id,resComments:this.state.comments[data.id+'textArea']},
				        	type: "PUT",
				 					success:function(data){
									console.log(data);
				 					if(data.nModified==0)
									{
									$("#"+btnId).css('background-color','orange');
									$("#"+btnId).text('Give Something..');
										}
				 					else
									{
				 						$("#"+btnId).css('background-color','green');
										$("#"+btnId).text('Give FeedBack');
										$("#"+btnId+"textArea").val('');
										}
				 					}
				 					})
									else
									{
									$("#"+btnId).css('background-color','orange');
									$("#"+btnId).text('Give Something..');
									}
				 			 }

  render(){
      const listImages =this.props.restaurantDB.map((data,id) =>{
			this.state.displayRestDB[data._id]={_id:data._id,resName:data.resName,resImage:data.resImage,resRating:data.resRating,resAddress:data.resAddress};
      var img=data.resImage;
      if(!img)
        img='http://vignette3.wikia.nocookie.net/galaxylife/images/6/6d/No_image.png';

    return(
        <Card key={data._id}>
	        <Image src={img} height="25%" />
	          <Card.Content>
	            <Card.Header>{data.resName}</Card.Header>
							<Rating icon='star' defaultRating={data.resRating} maxRating={5} />
	            <Card.Meta>{data.resAddress}</Card.Meta>
	      	  </Card.Content>
            <Card.Content extra>
						<Form><TextArea id={data._id+"textArea"} placeholder='Comments' autoHeight onChange={this.comments.bind(this)}/></Form><br /><br />
						<Button id={data._id} color='purple' onClick={this.updateDB.bind(this)} >Give FeedBack</Button>
						</Card.Content>
						<Card.Content extra>
						<Button id={data._id} color='red' onClick={this.deleteDB.bind(this)} >Delete</Button>
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
