import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// material-ui import statements
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
  });

class AddGalleryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIn: '',
            descriptionIn: '',
            imgOrDesc: true,
            displayOut: (<img onClick={this.handleClick} src={this.props.image} alt={this.props.description}/>),
        }
    }

    // function that adds entered image url and description to the database
    addNewPictureToDatabase = (event) => {
        // prevent the form from refreshing the DOM
        event.preventDefault();
        // add path and description to an object for the database
        let dataToSend = {
                            path: this.state.imageIn,
                            description: this.state.descriptionIn
        };

        // axios POST request to send the entered image and description to the database
        axios({
            method: 'POST',
            url: `/gallery`,
            data: dataToSend
        }).then((response) => {
            // alert to the user that the image was successfully added
            swal("Congratulations!", "A new image was added to the gallery!", "success");
            // refresh the DOM with the updated data from database
            this.props.galleryRefresh()
        }).catch((error) => {
            // console log and error message that the POST failed
            console.log(`Error in axios POST: ${error}`);
            alert(`Error adding an image to the database.`);
        });
    }

    // function that sets the state for input fields
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.addNewPictureToDatabase}>
                <h2>Enter another photo to be displayed in the Gallery</h2>
                <TextField
                    id="outlined-full-width"
                    label="Image url:"
                    style={{ margin: 8 }}
                    placeholder="enter url"
                    fullWidth
                    helperText="Enter the url for the image to be added"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    name="imageIn"
                    onChange={this.handleInputChange}
                />
                <TextField
                    id="outlined-multiline-full-width"
                    label="Photo description:"
                    style={{ margin: 8 }}
                    fullWidth
                    multiline
                    rows="4"
                    placeholder="description of the image"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    name="descriptionIn"
                    onChange={this.handleInputChange}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Submit new photo
                </Button>
            </form>
        )
    }
}

AddGalleryItem.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AddGalleryItem);