import React from "react";
import './movie-card.scss';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (

      <Card className="h-100 bg-transparent">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title><h3>{movie.Title}</h3></Card.Title>
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="link">View</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
