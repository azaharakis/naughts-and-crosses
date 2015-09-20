var React = require('react');
var GridItem = require('./Components/GridItem');
var Player = require('./Models/Player');
function generateEmptyGrid() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
}


var TicTackToeBoard = React.createClass({
    getInitialState() {
        return {
            grid: generateEmptyGrid()
        }
    },
    componentWillMount() {
        this.setCurrentPlayer();
    },
    setCurrentPlayer() {
        this.currentPlayer = (this.currentPlayer && this.currentPlayer.marker === this.props.player1.marker) ? this.props.player2 : this.props.player1;
    },
    canGridBeSet(pos) {
        return (this.state.grid[pos[0]][pos[1]] === null && !this.state.winner) ? true : false;
    },
    doWeHaveAWinner() {
        let currentGrid = this.state.grid;

        function doesCellBelongToCurrentPlayer(cell) {
            return (cell && cell.BelongsToPlayer.marker === this.currentPlayer.marker);
        }

        function filterForWinner(arr) {
            if (arr.filter((cell) => {
                    return doesCellBelongToCurrentPlayer.call(this, cell)
                }).length === arr.length) {
                this.setState({
                    winner: this.currentPlayer,
                    winningCells: arr
                });
            }
        }

        (function winByRow() {
            currentGrid.forEach((row, index)=> {
                filterForWinner.call(this, row)
            });
        }.bind(this))();

        (function winByColumn() {
            for (let i = 0; i < this.state.grid.length; i++) {
                let column = [];
                this.state.grid.forEach((row) => {
                    column.push(row[i]);
                });
                filterForWinner.call(this, column);
            }
        }.bind(this))();

        (function winByCrossSection() {
            let crossSectionTopToBottom = [];
            let crossSectionBottomToTop = [];
            this.state.grid.forEach((row, index) => {
                crossSectionTopToBottom.push(row[index]);
                crossSectionBottomToTop.push(row[(row.length - 1) - index]);
            });
            filterForWinner.call(this, crossSectionTopToBottom);
            filterForWinner.call(this, crossSectionBottomToTop);
        }.bind(this))();

    },
    isBoardFull() {
        return this.state.grid.every(row=> {
            return row.every(item=> {
                return (item) ? true : false;
            });
        })
    },
    setPlayersMove(pos) {
        if (this.canGridBeSet(pos)) {
            var newGrid = this.state.grid;
            newGrid[pos[0]][pos[1]] = {
                BelongsToPlayer: this.currentPlayer,
                pos: pos
            };
            this.setState({
                grid: newGrid
            });
            this.doWeHaveAWinner();
            this.setCurrentPlayer();
        }
    },
    handlePlayerTurn(pos) {
        this.setPlayersMove(pos);
    },
    handleBoardReset() {
        this.setState({
            grid: generateEmptyGrid(),
            winner: undefined,
            noWinner: undefined,
            winningCells: undefined
        });
    },
    renderGrid() {
        return this.state.grid.map((row, rowKey) => {
            return (
                <div key={rowKey} className="tic-tac-board__row">
                    {row.map((cell, itemKey) => {

                        let displayColor = false;

                        let player = (cell) ? cell.BelongsToPlayer : null;
                        if (this.state.winningCells) {
                            this.state.winningCells.forEach((cell) => {
                                if (rowKey === cell.pos[0] && itemKey === cell.pos[1]) {
                                    displayColor = true;
                                }
                            })
                        }

                        return (
                            <GridItem {...player} displayColor={displayColor} handleClick={this.handlePlayerTurn.bind(this, [rowKey, itemKey])} key={`${itemKey}-${rowKey}`} >
                                {cell && cell.BelongsToPlayer.marker}&nbsp;
                            </GridItem>
                        );
                    })}
                </div>
            );
        })
    },
    render() {
        return (
            <div className="tic-tac-board">
                <h1>Tic Tac Toe Board</h1>
                {(!this.isBoardFull() && !this.state.winner) && <span>{this.currentPlayer.name}'s turn, their marker is {this.currentPlayer.marker}</span>}
                {this.state.winner && <span onClick={this.handleBoardReset}>The winner is {this.state.winner.name}! Play Again?</span>}
                {(this.isBoardFull() && !this.state.winner) && <span onClick={this.handleBoardReset}> There is no winner :( Play Again?</span>}
                <br/>
                <br/>
                {this.renderGrid()}
            </div>
        )
    }
});


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
                <TicTackToeBoard {...this.state}/>
            </div>
        );
    }
});
