import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { setMovies, setUser } from '../../actions/actions';

import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBar } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view.jsx';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../Login-View/Login-View';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      selectedMovie: null,
    };
    console.log('main-view loaded successfully')
  }

  // src/components/main-view/main-view.jsx
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        this.setState({
            user: localStorage.getItem('user')
        });
        console.log('compnentdid mount');
        this.getMovies(accessToken);
        this.getAcc(accessToken);
    }
  }

  getAcc(token) {
    axios.get(`https://sharmilamovie.herokuapp.com/users`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setUser(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('Success getting account');
  }

  getMovies(token) {
    axios.get('https://sharmilamovie.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('success getting movies')
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
        user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  } 

  render() {
    let { movies } = this.props;
    let { user } = this.state;
    console.log('Mainview rendered user', user);
    console.log('Mainview rendered movies', movies);
    return (
      <>
        <Router>
            {/* Start of Main View*/}
            <Row className="main-view justify-md-content-center">
              <Route exact path="/" render={() => {
                if (!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
                if (movies.length === 0) return (<div className="main-view" />);
                return (
                  <>
                    <Row className="m-3 navigation-main"><NavBar user={user} /></Row>
                    <MoviesList movies={movies} />;
                  </>
                )
              }} />

              {/* Start of register View */}
              <Route path="/register" render={() => {
                if (user) return <Redirect to='/' />
                return (
                  <Row>
                    <Col>
                      <RegistrationView user={user} />
                    </Col>
                  </Row>
                )
              }} />

              {/* Start of Profile View */}
              <Route path="/users/:Username" render={({ history }) => {
                {/* if(!user) return <Redirect to="/" /> */}
                if (movies.length === 0) return <div className="main-view" />
                if (!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                )
                return (
                  <>
                    <Row className="m-3 navigation-main">
                      <Col>
                        <NavBar user={user} />
                      </Col>
                    </Row>
                    <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                  </>
                )
              }} />

              {/* Update the Profile */}
              <Route path="/users/:Username" render={({ history }) => {
                {/* if(!user) return <Redirect to="/" /> */}
                if (movies.length === 0) return <div className="main-view" />
                if (!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                )
                return (
                  <>
                    <Row className="mb-3 navigation-main">
                      <Col>
                        <NavBar user={user} />
                      </Col>
                    </Row>
                    <UpdateView user={user} movies={movies} onBackClick={() => history.goBack()} />
                  </>
                )
              }
              } />

              {/* Start of Movie View */}
              <Route path="/movies/:Title" render={({ match, history }) => {
                if (!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                ) 
                return <>
                  <Row className="m-3 navigation-main"><NavBar user={user} /></Row>
                  <Row>
                    <Col md={8}>
                      <MovieView movie={movies.find(m => m.Title === match.params.Title)} onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>
                </>
              }} />

              {/* Start of Genre View */}
              <Route exact path="/genres/:name" render={({ match, history }) => {
                if (!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                )
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <>
                    <Row className="m-3 navigation-main">
                      <Col>
                        <NavBar user={user} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <GenreView Genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} movies={movies} />
                      </Col>
                    </Row>
                  </>
                )
              }} />
            
              {/* Start of Director View */}
              <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                )
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <>
                    <Row className="m-3 navigation-main">
                      <Col>
                        <NavBar user={user} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.director).Director} onBackClick={() => history.goBack()} movies={movies} />
                      </Col>
                    </Row>
                  </>
                  )
                }} />
            </Row>
      </Router>
    </>);
    }
  };

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user, 
  }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);