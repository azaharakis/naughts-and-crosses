var React = require('react');
var GridItem = require('./GridItem');

function generateEmptyGrid() {
    return [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];
}

function getWinningCells(grid, currentPlayer) {
    let currentGrid = grid;
    let matched;

    let doesCellBelongToCurrentPlayer = ({ player } = {}) => player === currentPlayer;

    function filterForWinner(arr, key) {
        var matchedCells = [];
        if (arr.filter(doesCellBelongToCurrentPlayer).length === arr.length) {
            arr.forEach( (i,k) => {
                matchedCells.push([key,k])
            });
            matched = arr;
        }
    }

    //Win By Row
    currentGrid.forEach( filterForWinner );

    //Win by Column
    for (let i = 0; i < currentGrid.length; i++) {
        let column = [];
        currentGrid.forEach((row) => {
            column.push(row[i]);
        });
        filterForWinner(column);
    }

    ////Win by cross section
    let crossSectionTopToBottom = [];
    let crossSectionBottomToTop = [];
    currentGrid.forEach((row, index) => {
        crossSectionTopToBottom.push(row[index]);
        crossSectionBottomToTop.push(row[(row.length - 1) - index]);
    });
    filterForWinner(crossSectionTopToBottom);
    filterForWinner(crossSectionBottomToTop);

    return matched;
}

module.exports = React.createClass({
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
        return (!this.state.grid[pos[0]][pos[1]]  && !this.state.winner) ? true : false;
    },

    isBoardFull() {
        return this.state.grid.every(row=> {
            return row.every(item=> {
                return (item) ? true : false;
            });
        })
    },

    setPlayersMove(pos) {
        let x = pos[0];
        let y = pos[1];
        if (this.canGridBeSet(pos)) {
            var newGrid = this.state.grid;
            newGrid[x][y] = {
                player: this.currentPlayer,
                pos: pos
            };
            this.setState({
                grid: newGrid
            });
            var winningCells = getWinningCells(this.state.grid, this.currentPlayer);
            if(winningCells){
                this.setState({
                    winner: this.currentPlayer,
                    winningCells
                });
            }
            this.setCurrentPlayer();
        }
    },

    handleBoardReset() {
        this.setState({
            grid: generateEmptyGrid(),
            winner: undefined,
            noWinner: undefined,
            winningCells: undefined
        });
    },

    renderBoard() {
        return this.state.grid.map((row, x) => {
            return (
                <div key={x} className="tic-tac-board__row">
                    {row.map((cell, y) => {

                        let displayColor = false;

                        let player = (cell) ? cell.player : undefined;
                        if (this.state.winningCells) {
                            this.state.winningCells.forEach((cell) => {
                                if (x === cell.pos[0] && y === cell.pos[1]) {
                                    displayColor = true;
                                }
                            })
                        }

                        return (
                            <GridItem {...player} displayColor={displayColor} handleClick={this.setPlayersMove.bind(this, [x, y])} key={`${y}-${x}`} >
                                {cell && cell.player.marker}&nbsp;
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
                {this.renderBoard()}
            </div>
        )
    }
});

