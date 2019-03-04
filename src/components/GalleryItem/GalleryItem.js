import React, { Component } from 'react';
import axios from 'axios';
import './GalleryItem.css';
import swal from 'sweetalert';
import GalleryItemPopover from './../GalleryItemPopover/GalleryItemPopover.js';

// material-ui import statements
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import PeopleIcon from '@material-ui/icons/People';
import PhotoIcon from '@material-ui/icons/Photo';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


class GalleryItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        }
    }

    // click handler for the like button
    handleLikeClick = () => {
        // send PUT request to update the like value for an item clicked
        axios({
            method: 'PUT',
            url: `/gallery/like/${this.props.imgId}/${this.props.likes}`,
        }).then((response) => {            
            // swal("Thanks!", "You liked this picture.", "success");
            // call the getGalleryFromServer function in App.js to refresh the page
            this.props.galleryRefresh()
        }).catch((error) => {
            // Console log and alert for error PUT
            console.log(`Error in axios PUT: ${error}`);
            alert(`Error adding a like to the image.`);
        });
    } // end handleLikeClick

    // click handler for the delete button
    handleDeleteClick = () => {
        // send DELETE request to remove the item clicked on from the database
        swal({
            title: "Comfirm delete?",
            text: "This image will be removed from the gallery, are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((deleteItem) => {
            if (deleteItem) {
                // send DELETE request to remove the item clicked on from the database
                axios({
                    method: 'DELETE',
                    url: `/gallery/delete/${this.props.imgId}`,
                }).then((response) => {
                    // alert letting the user know that the image was deleted
                    swal("The image was removed from the gallery.", { icon: "success", });
                    // call the getGalleryFromServer function in App.js to refresh the page
                    this.props.galleryRefresh()
                }).catch((error) => {
                    // Console log and alert for error in DELETE
                    console.log(`Error in axios DELETE: ${error}`);
                    alert(`Error when deleting an image from the database.`);
                }); // end axios DELETE
            } else {
                swal("Delete image was cancelled.");
            }
        });
    } // end handleDeleteClick

    // click handler for opening the popover
    handlePopoverClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    } // end handlePopoverClick
    
    // click handler for closing the popover window
    handlePopoverClose = () => {
        this.setState({
            anchorEl: null,
        });
    } // end handlePopoverClose

    render() {

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const titleText = `${this.props.likes} people like this photo`;

        return (
            <Grid item md={3}>
                <Card className="item-card">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={this.props.description}
                            className="item-img"
                            height="340"
                            image={this.props.image}
                            title={titleText}
                            onClick={this.handlePopoverClick}
                        />
                        <Popover
                            id="simple-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}>
                                <GalleryItemPopover description={this.props.description} />
                        </Popover>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.likes} <PeopleIcon /> <ThumbUpIcon /> <ArrowUpIcon /> <PhotoIcon />
                            </Typography>
                            <Typography component="p">
                                {this.props.description}
                            </Typography>
                            </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Tooltip title="Like this photo">
                            <IconButton aria-label="Like this photo" color="primary" onClick={this.handleLikeClick}>
                                <PlusOneIcon /> <ThumbUpIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete" color="secondary" onClick={this.handleDeleteClick}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default GalleryItem;