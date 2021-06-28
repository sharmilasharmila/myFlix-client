import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      // s
      user: null
    }
  }

// Mount Components
componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

onBackClick() {
  this.setState({
      selectedMovie: null
  });
}

// Do this after login process
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

onRegister(register) {
  this.setState({
    register
  });
}

onLoggedOut() {
localStorage.removeItem('token');
localStorage.removeItem('user');
this.setState({
  user: null
});
}

//Get Movies from database Function
getMovies(token) {
  axios.get('https://sharmilamovie.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

  render() {
    let {movies} = this.props;
    const {user} = this.state;
    // const {selectedMovie, register } = this.state;
    // if (register) return <RegistrationView onRegister={register => this.onRegister(register)}/>;
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
    // if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={()=>{
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies}/>
          }} />
          <Route path="/register" render={()=><RegistrationView/>} />
          <Route path="/movies/:movieId" render={({match})=><MovieView movie=
          {movies.find(m=>m._id === match.params.movieId)} />} />
        </div>
        {/* <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          //given
          <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
          }} />
          <Route exact path="/genres/:name" render={({ match }) => {
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)} onBackClick={() => history.goBack()}/>
            </Col>
          }}/>
          //given
          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row> */}
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {movies:state.movies}
}

export default connect(mapStateToProps, {setMovies})(MainView);
