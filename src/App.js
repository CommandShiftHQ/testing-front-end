import React, { Component } from "react";
import "./styles/App.css";
import ArtistsList from "./components/artists-list";
import FormSection from "./components/form-section";
import Button from "./components/buttons";
import { exportAllDeclaration } from "@babel/types";

const validate = str => {
  if(str.length < 1 || undefined || null) {
    return false;
  }

  return true;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      showInput: false,
      validationErrorMessage: ''
    };
  }

  componentDidMount() {
    fetch("https://music-library-api.herokuapp.com/artists")
      .then(response => response.json())
      .then(artists => this.setState({ artists }));
  }

  handleInputSwitch = () => this.setState({ showInput: !this.state.showInput });

  handleOnSubmit = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const genre = event.target.genre.value;

    if(validate(name) && validate(genre)) {

    const options = {
      method: "POST",
      body: JSON.stringify({
        name: name,
        genre: genre
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("https://music-library-api.herokuapp.com/artists", options)
      .then(response => response.json())
      .then(parsedResponse => {
        const newArtist = [
          {
            name: name,
            genre: genre,
            _id: parsedResponse._id
          }
        ];

        this.setState({
          artists: this.state.artists.concat(newArtist),
          showInput: false
        });
      });
    }

    this.setState({
      validationErrorMessage: "Please watch out"
    })
  };

  handleDelete = (event, artistId) => {
    const options = {
      method: "DELETE"
    };

    fetch(
      `https://music-library-api.herokuapp.com/artists/${artistId}`,
      options
    ).then(response => {
      this.setState({
        artists: this.state.artists.filter(artist => artist._id !== artistId)
      });
    });
  };

  render() {
    const { artists, showInput, validationErrorMessage } = this.state;

    if (artists.length === 0) return <div>Loading...</div>;

    return (
      <div className="App">
        <h1>My favourite artists</h1>
        <ArtistsList 
          artists={artists} 
          handleOnClick={this.handleDelete} />
        <div className="artists-input-section">
          {!showInput &&
            <Button
              qaClass="button-add-more"
              label="Add more"
              type="button"
              handleOnClick={this.handleInputSwitch}
            />}
          <FormSection 
            showInput={showInput} 
            validationErrorMessage={validationErrorMessage}
            handleInputSwitch={this.handleInputSwitch} 
            handleOnSubmit={this.handleOnSubmit}/>
        </div>
      </div>
    );
  }
}

export default App;
