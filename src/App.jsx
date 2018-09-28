import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }


  search() {

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    let accessToken = 'BQAtcJHm1TktropHQXuovh4ZgnB1iTvUrih-9_HNRgfXDqYtx6ST_kuGA6bwjJRnmGeR97BYm23tAJ9x_Y1k5swUwLS0L-i5PoE55RZ-qbUrByS0PFe3xgVeo2kp8bW66RyXULQIp67-S00xvju-yTXyhPBm3QxNaRKEhCQZzhlfUIY';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    let myHeaders = new Headers();
    let myOptions = {
          method: 'GET',
          headers:  {
            'Authorization': 'Bearer ' + accessToken
        },
        mode: 'cors',
        cache: 'default'
    };

     fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks:', json);
        const { tracks } = json;
        this.setState({tracks});
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music center</div>
        <div className="keywords-section">
         <p>Keywords to use in search:</p>
         <strong>adele, michael jackson, the beatles, bruno mars, alicia keys</strong>
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }

      </div>
    )
  }
}

export default App;
