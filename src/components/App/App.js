import React, { Component } from 'react';
import axios from 'axios';
import Header from './../Header/Header.js';
import GalleryList from './../GalleryList/GalleryList.js';
import AddGalleryItem from '../AddGalleryItem/AddGalleryItem.js';
import './App.css';

// material-ui import statements
import Paper from '@material-ui/core/Paper';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      galleryItems: [],
    }
  }

  // Will be called after the page loads
  componentDidMount() {
    // function to get images from the server
    this.getGalleryFromServer();
  }

  // function that makes a GET request to the server and then stores the data on App state
  getGalleryFromServer = () => {
    axios({
      method: 'GET',
      url: '/gallery',
    }).then((response) => {
      // put the data in the local state array galleryItems
      this.setState({
        galleryItems: response.data,
      })
    }).catch((error) => {
      // console log and error alert if there is a problem with GET
      console.log(`Error in APP get: ${error}`);
      alert(`Error in getting the gallery.`);
    });
  }

  render() {
    return (
      <div className="App">
        <Paper className="App-paper">
          <Header />
          <br/>
          <GalleryList galleryItems={this.state.galleryItems} galleryRefresh={this.getGalleryFromServer}/>
          <br/>
          <AddGalleryItem galleryRefresh={this.getGalleryFromServer}/>
        </Paper>
      </div>
    );
  }
}

export default App;
