import React from 'react';
import {
  Grid,Card,  CardContent, CardHeader, CardMedia,CardActionArea, Typography
} from '@material-ui/core';
import { Link } from "react-router-dom";
import './userPhotos.css';
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:undefined,
      photos:undefined
    };
    let userId = props.match.params.userId;
    let promise1 = fetchModel(`http://localhost:3000/photosOfUser/${userId}`);
    promise1.then(response => {
      this.setState({photos: response.data});
    });
    let promise2 = fetchModel(`http://localhost:3000/user/${userId}`);
    promise2.then(response => {
      this.setState({user: response.data});
      this.props.changeView(`Photos of ${this.state.user.first_name} ${this.state.user.last_name}`);
    });
  }

  // componentDidUpdate = (prevProps) => {
  //   let newUserID = this.props.match.params.userId;
  //   if (prevProps.match.params.userId !== newUserID) {
  //     let newUser = window.cs142models.userModel(newUserID);
  //     let newPhotos = window.cs142models.photoOfUser(newUserID);
  //     this.setState({user:newUser,photos:newPhotos});
  //     this.props.changeView(`Photos of ${newUser.first_name} ${newUser.last_name}`);
  //   }
  // };

  render() {
    return this.state.user ? (
        <Grid container justifyContent="space-between" alignItems="center">
        {this.state.photos ? this.state.photos.map((photo) => {
        return (
          <Grid item xs={5} key={photo._id}>
            <Card>
            <CardActionArea>
              <CardHeader
              title={`${photo.file_name}`}
              subheader={`Creation Time: ${photo.date_time}`}
              />
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={`./images/${photo.file_name}`}
                alt="green iguana"
              />
              <CardContent>
                {photo.comments ? photo.comments.map((comment) => {
                  return (
                    <Grid container direction="column" key={comment._id}>
                      <Typography variant="body2" color="inherit">
                      {comment.date_time}  
                      </Typography>
                      <Typography variant="body2" color="inherit">
                        <Link to={`/users/${comment.user._id}`}>
                          {`${comment.user.first_name} ${comment.user.last_name}`}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="secondary">
                      {comment.comment}
                      </Typography>
                    </Grid>
                    );
                  }) : <div />}
              </CardContent>
            </CardActionArea>
            </Card>
          </Grid>
        );}
      ) : <div/>}
        </Grid>
    ) : <div/>;
  }
}

export default UserPhotos;
