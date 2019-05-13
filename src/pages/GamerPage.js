import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import GamerStats from '../components/GamerStats';
// import NewGame from '../components/NewGame';
import GamerGameHistory from '../components/GamerGameHistory';
import GamerList from '../components/GamerList';
import Header from './Header';

class GamerPage extends Component {
  state = {
    selectedGamer: this.props.myID,
  }

  changeGamer = (id) => {
    this.setState({ selectedGamer: id })
  }

  render() {
    return (
      <Query query={GAMER_QUERY} variables={{ id: this.state.selectedGamer }}>
        {({ loading, error, data, refetch }) => {

          return (
            <>
              <Header />
              <div id="gamerPageDiv" className="row d-flex justify-content-center my-4">
                <div className="col-m d-flex flex-column">
                  <GamerStats gamer={data.user} loading={loading} />
                  <GamerGameHistory myID={this.props.myID} gamer={data.user} loading={loading} />
                </div>
                <div className="col-m">
                  <GamerList changeGamer={this.changeGamer} />
                </div>
              </div>
            </>
          )
        }}
      </Query>
    );
  }
}

const GAMER_QUERY = gql`
  query GAMER_QUERY($id: ID!) {
    user(id: $id) {
      id
      gamertag
      h2rank
      h3rank
      games {
        id
        createdAt
        updatedAt
        gameType
        result
        kills
        deaths
      }
    }
  }
`

export default GamerPage;
export { GAMER_QUERY };