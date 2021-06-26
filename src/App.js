import React, { Component } from 'react';
// import Clarifai from 'clarifai';
// https://docs.clarifai.com/api-guide/api-overview/api-clients#client-installation-instructions
// https://github.com/Clarifai/clarifai-javascript
// https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js <-- List of all models
// https://docs.clarifai.com/
// https://docs.clarifai.com/api-guide/predict/images

import './App.css';
import Particles from 'react-particles-js';
import particleOptions from './particle-options'; //https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

// const app = new Clarifai.App({
//   apiKey: '62ce0340ee1e4b38ae28fc9e65212fa3'
// });

const initialState = {
  input: '',
  imageUrl: 'https://commons.bcit.ca/news/files/2018/05/college_students.jpg', // https://bocamolla.files.wordpress.com/2014/10/nelson-mandela.jpg
  boxes: [],
  route: 'signin', //keeps track of where we are on the page
  isSignedIn: false,
  translation: '',
  user: {
    id: '25',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  // this.onInputChange = this.onInputChange.bind(this); <-- Not necessary if you use arrow function format (see below)
  // this.onPicture = this.onPicture.bind(this);
  componentDidMount() {
    fetch('https://damp-oasis-01473.herokuapp.com/')
      .then(resp => resp.json())
      .then(console.log)
      .catch(console.log);
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  calculateFaceLocations = (data) => {
    console.log(data.outputs);
    const image = document.getElementById('inputImage');
    const width = Number(image.width); // Make sure that it's a number
    const height = Number(image.height); // Make sure that it's a number
    //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    return data.outputs[0].data.regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      console.log('clarifaiFace: ' + clarifaiFace)
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBoxes = (boxes) => {
    console.log('Boxes: ', boxes);
    this.setState({ boxes: boxes }); // Could also be written as {box} in ES6    
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  onPictureSubmit = () => {
    console.log('State at submit: ', this.state.input);
    const input = this.state.input !== '' ? this.state.input : 'https://commons.bcit.ca/news/files/2018/05/college_students.jpg';
    this.setState({
      imageUrl: input
    });
  
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    fetch('https://damp-oasis-01473.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ input })
    })
      .then(response => response.json() ) 
      .then(response => {
        if (response) {
         fetch('https://damp-oasis-01473.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
      console.log(this.state.route)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {

    const { route, isSignedIn, imageUrl, boxes, user } = this.state; // Destructure for tidiness

    return (
      <div className='App'>
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation route={route} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          this.state.route === 'home'
            ? <div>
              <Rank userName={user.name} userEntries={user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit} />
              <FaceRecognition
                imageUrl={imageUrl}
                boxes={boxes} />
            </div>
            : (
              route === 'signin'
                ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
