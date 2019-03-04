import React, { Component } from 'react';
import GalleryItem from './../GalleryItem/GalleryItem.js';

// material-ui import statements
import Grid from '@material-ui/core/Grid';

class GalleryList extends Component {
    
    // function to display gallery items on the DOM
    displayGallery = (galleryArrayIn) => {

        // array for items to be returned when the function is called
        let displayArray = [];
    
        // loop through the array sent and add Jsx and click handlers to the data
        for( let i in galleryArrayIn ) {
            // adds the output from GalleryItem.js to the array
            displayArray.push(<GalleryItem  key={galleryArrayIn[i].id}
                                            imgId={galleryArrayIn[i].id}
                                            image= {galleryArrayIn[i].path}
                                            description={galleryArrayIn[i].description}
                                            likes={galleryArrayIn[i].likes}
                                            galleryRefresh={this.props.galleryRefresh}
                                            />);
        }
    
        return displayArray;
    
    }

    render() {
        return (
            <Grid container spacing={24}>                
                {this.displayGallery(this.props.galleryItems)}
            </Grid>
        )
    }
}

export default GalleryList;