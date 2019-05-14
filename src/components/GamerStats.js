import React, { Component } from 'react';
import calculateStats from '../utils/calculateStats';

class GamerStats extends Component {

  render() {
    let h2 = {};
    let h3 = {}

    if (this.props.gamer || !this.props.loading) {
      const stats = calculateStats(this.props.gamer);
      h2 = stats.h2;
      h3 = stats.h3;
    }



    if (this.props.loading) return (
      <div className="d-flex flex-column m-4 width-400">
        <h4 className="display-4">Loading...</h4>

        <div className="d-flex justify-content-start">
          <div className="stats-1 text-center"></div>
          <div className="stats-2 text-center"><strong><u>Rank</u></strong></div>
          <div className="stats-3 text-right"><strong><u>Record</u></strong></div>
          <div className="stats-4 text-right"><strong><u>K / D</u></strong></div>
        </div>
        <div className="d-flex justify-content-start">
          <div className="stats-1">Halo 2:</div>
          <div className="stats-2"></div>
          <div className="stats-3 text-right"></div>
          <div className="stats-4 text-right"></div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <div className="stats-1">Halo 3:</div>
          <div className="stats-2"></div>
          <div className="stats-3 text-right"></div>
          <div className="stats-4 text-right"></div>
        </div>
      </div>
    )



    return (
      <div className="d-flex flex-column m-4 width-400">
        <h4 className="display-4">{this.props.gamer.gamertag}</h4>

        <div className="d-flex justify-content-start">
          <div className="stats-1 text-center"></div>
          <div className="stats-2 text-center"><strong><u>Rank</u></strong></div>
          <div className="stats-3 text-right"><strong><u>Record</u></strong></div>
          <div className="stats-4 text-right"><strong><u>K / D</u></strong></div>
        </div>
        <div className="d-flex justify-content-start">
          <div className="stats-1">Halo 2:</div>
          <div className="stats-2"><img src={`/images/${h2.rank}.png`} alt="rank-logo" /></div>
          <div className="stats-3 text-right">{h2.record}</div>
          <div className="stats-4 text-right">{h2.kd}</div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <div className="stats-1">Halo 3:</div>
          <div className="stats-2"><img src={`/images/${h3.rank}.png`} alt="rank-logo" /></div>
          <div className="stats-3 text-right">{h3.record}</div>
          <div className="stats-4 text-right">{h3.kd}</div>
        </div>
      </div>
    );
  }
}

export default GamerStats;