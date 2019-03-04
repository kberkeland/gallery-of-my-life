import React, { Component } from 'react';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class GalleryItemPopover extends Component {

    render() {
        // taken from https://material-ui.com/utils/popover/
        const { classes } = this.props;

        return(
            <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant="h5" component="h3">
                    Photo description
                </Typography>
                <Typography component="p">
                    {this.props.description}
                </Typography>
            </Paper>
          </div>
        )
    }
}

GalleryItemPopover.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GalleryItemPopover);