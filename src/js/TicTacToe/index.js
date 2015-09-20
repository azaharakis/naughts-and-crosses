var React = require('react');
var Player = require('./Models/Player');
var Board = require('./Components/Board');

module.exports = React.createClass({
    getInitialState() {
        return {
            player1: new Player({
                name: "Player 1",
                marker: "x",
                color: "red"
            }),
            player2: new Player({
                name: "Player 2",
                marker: "o",
                color: "blue"
            })
        }
    },
    handleChange(e, player) {
        this.setState({
            [player]: new Player({
                name: e.currentTarget.value,
                marker: this.state[player].marker,
                color: this.state[player].color
            })
        })
    },

    render() {
        return (
            <div>
                <div>
                    <label className="input-field">
                        Player 1:
                        <input className="input-field__text" onChange={(e)=> {
                            this.handleChange.call(this, e, 'player1')
                        }} defaultValue={this.state.player1.name} />
                    </label>
                </div>
                <div>
                    <label className="input-field">
                        Player 2:
                        <input className="input-field__text" onChange={(e)=> {
                            this.handleChange.call(this, e, 'player2')
                        }} defaultValue={this.state.player2.name} />
                    </label>
                </div>
                <Board {...this.state}/>
            </div>
        );
    }
});
