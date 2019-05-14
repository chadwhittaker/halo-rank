import React, { Component } from 'react';
import gql from 'graphql-tag';

import NewGame from './NewGame';
import GameHistory from './GameHistory';

class GamerGameHistory extends Component {
  render() {
    if (this.props.loading) return (
      <div className="d-flex flex-column m-4 width-400">
        <div className="d-flex flex-column">
          <h4 className="display-4">Game History:</h4>
          <div>Loading...</div>
        </div>
      </div>
    )

    return (
      <div className="d-flex flex-column m-4 width-400">
        {this.props.myID === this.props.gamer.id && <NewGame gamer={this.props.gamer} />}
        <GameHistory games={this.props.gamer.games.reverse()} loading={this.props.loading} />
      </div>
    );
  }
}

const GAMES_QUERY = gql`
  query GAMES_QUERY ($id: ID!) {
    games(id: $id) {
      id
      createdAt
      gameType
      result
      kills
      deaths
    }
  }
`

export default GamerGameHistory;
export { GAMES_QUERY };