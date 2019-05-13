import React, { Component } from 'react';
import { format } from 'date-fns';

class GameHistory extends Component {

  renderGames = () => {
    if (this.props.games.length === 0) return <div className="font-italic">No games posted...</div>


    return (
      this.props.games.map((game) => {
        return (
          <div key={game.id} className="d-flex">
            <div className="history-1">{format(game.createdAt, 'MM/DD/YY hh:mm A')}</div>
            <div className="history-2">{game.gameType}</div>
            <div className={`history-3 ${game.result === 'win' ? 'text-green' : 'text-red'}`}>{game.result.slice(0,1)}</div>
            <div className="history-4">{game.kills}</div>
            <div className="history-5">{game.deaths}</div>
          </div>
        )
      })
    )
  }


  render() {
    return (
      <div className="d-flex flex-column my-4">
        <h4 className="display-4 mt-4">Game History:</h4>
        <div className="d-flex">
            <div className="history-1"><strong><u>Date/Time:</u></strong></div>
            <div className="history-2"></div>
            <div className="history-3"></div>
            <div className="history-4"><strong><u>K</u></strong></div>
            <div className="history-5"><strong><u>D</u></strong></div>

          </div>
        {!this.props.loading && this.renderGames()}
      </div>
    );
  }
}

export default GameHistory;