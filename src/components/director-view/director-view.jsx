import React from 'react';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
        <span className="label">Title: </span>
        <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Details: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Birth Year: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="label">Death Year: </span>
          <span className="value">{director.Death}</span>
        </div>
       </div>
}
