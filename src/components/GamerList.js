import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class GamerList extends Component {

  renderGamers = (gamers) => {
    return (
      <>
        <div className="d-flex justify-content-start">
          <div className="list-1"><strong><u>Gamertag:</u></strong></div>
          <div className="list-2 text-center"><strong><u>H2</u></strong></div>
          <div className="list-3 text-center"><strong><u>H3</u></strong></div>
          <div className="list-4 text-right"></div>
        </div>

        {gamers.map((gamer) => {
          return (
            <div className="d-flex justify-content-start mt-2" key={gamer.id}>
              <div className="list-1">{gamer.gamertag}</div>
              <div className="list-2 text-center"><img src={`/images/${gamer.h2rank}.png`} alt="rank-logo" /></div>
              <div className="list-3 text-center"><img src={`/images/${gamer.h3rank}.png`} alt="rank-logo" /></div>
              <div className="list-4"><button onClick={() => this.props.changeGamer(gamer.id)} type="button" className="btn btn-sm btn-dark">Stats</button></div>
            </div>
          )
        })}
      </>
    )
  }

  render() {
    return (
      <Query query={ALL_GAMERS_QUERY}>
        {({ data, loading, error, refetch }) => {

          return (
            <div className="d-flex flex-column m-4 width-400">
              <div>
                <h4 className="display-4 text-left">Rankings:</h4>
              </div>
              {loading && <div>Loading gamers...</div>}
              {!loading && this.renderGamers(data.users)}
            </div>
          )
        }}
      </Query>
    );
  }
}

const ALL_GAMERS_QUERY = gql`
  query ALL_GAMERS_QUERY {
    users {
      id
      gamertag
      h2rank
      h3rank
    }
  }
`

export default GamerList;