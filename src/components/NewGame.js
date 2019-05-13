import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// import { GAMES_QUERY } from './GamerGameHistory';
import { GAMER_QUERY } from '../pages/GamerPage';

class NewGame extends Component {
  state = {
    gameType: "h2",
    result: 'win',
    kills: 0,
    deaths: 0,
  }

  handleChange = (e) => {
    // console.log(e.target.tagName)
    if (e.target.tagName === "LABEL") {
      e.target = e.target.querySelector('input')
    }

    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    // if its a number turn the string into a number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  onSubmit = async (e, createGame) => {
    e.preventDefault();

    await createGame();

    this.setState({
      gameType: "h2",
      result: 'win',
      kills: 0,
      deaths: 0,
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_GAME_MUTATION} variables={this.state} refetchQueries={[{ query: GAMER_QUERY, variables: { id: this.props.gamer.id } }]} >
        {(createGame, { data, error, loading }) => (
          <div className="width-300 my-4">
            <h4 className="display-4 mb-3">Post New Game:</h4>
            <form id="newGameForm" onSubmit={(e) => this.onSubmit(e, createGame)}>
              <fieldset disabled={loading}>
                <div className="form-group d-flex justify-content-start mb-1">
                  <label className="width-120">Game Type:</label>
                  <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label onClick={this.handleChange} className={this.state.gameType === 'h2' ? "btn btn-sm btn-outline-dark width-70 active" : "btn btn-sm btn-outline-dark width-70"} >
                      <input
                        type="radio"
                        id="gameTypeH2"
                        name="gameType"
                        value="h2"
                        checked={this.state.gameType === 'h2'}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />H2
                    </label>
                    <label onClick={this.handleChange} className={this.state.gameType === 'h3' ? "btn btn-sm btn-outline-dark width-70 active" : "btn btn-sm btn-outline-dark width-70"}>
                      <input
                        type="radio"
                        id="gameTypeH3"
                        name="gameType"
                        value="h3"
                        checked={this.state.gameType === 'h3'}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />H3
                    </label>
                  </div>
                </div>

                <div className="form-group d-flex justify-content-start mb-1">
                  <label className="width-120">Result:</label>
                  <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label onClick={this.handleChange} className={this.state.result === 'win' ? "btn btn-sm btn-outline-success width-70 active" : "btn btn-sm btn-outline-success width-70"} >
                      <input
                        type="radio"
                        id="win"
                        name="result"
                        value="win"
                        checked={this.state.result === 'win'}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />Win
                    </label>
                    <label onClick={this.handleChange} className={this.state.result === 'loss' ? "btn btn-sm btn-outline-danger width-70 active" : "btn btn-sm btn-outline-danger width-70"}>
                      <input
                        type="radio"
                        id="loss"
                        name="result"
                        value="loss"
                        checked={this.state.result === 'loss'}
                        onChange={this.handleChange}
                      />Loss
                    </label>
                  </div>
                </div>
                <div className="form-group d-flex justify-content-start">
                  <label className="width-120">K / D:</label>
                  <div className="width-70">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Kills"
                      min="0"
                      max="100"
                      step="1"
                      name="kills"
                      value={this.state.kills}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="width-70">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Deaths"
                      min="0"
                      max="100"
                      step="1"
                      name="deaths"
                      value={this.state.deaths}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-sm btn-block btn-dark">Post{loading ? "ing" : ""}</button>
                </div>
              </fieldset>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

const CREATE_GAME_MUTATION = gql`
  mutation CREATE_GAME_MUTATION($gameType: String!, $result: String!, $kills: Int, $deaths: Int) {
    createGame (
      gameType: $gameType,
      result: $result,
      kills: $kills,
      deaths: $deaths,
    ) {
      id
      gameType
      result
      kills
      deaths
    }
  }
`

export default NewGame;