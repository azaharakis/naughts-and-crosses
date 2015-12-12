const React = require('react');
const update = require('react-addons-update');
const GridItem = require('./GridItem');

function generateEmptyGrid() {
    return [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];
}

function getWinningCells(grid, currentPlayer) {

    const doesCellBelongToCurrentPlayer = ({ player } = {}) => player === currentPlayer;

    const doWeHaveWinningCells = ( foundWinningCells, cells ) => {
        return cells.filter(doesCellBelongToCurrentPlayer).length === cells.length ? cells : foundWinningCells;
    }

    const doWeHaveWinningCombination = ( foundWinningCombination, combination ) => {
        let winningCombination = combination.reduce( doWeHaveWinningCells, undefined );
        return winningCombination ? winningCombination : foundWinningCombination;
    };

    const testByRow = grid;
    const testByColumn = grid.map( (_, key) => grid.map( col => col[key] ) );
    const testByDiagonalTopToBottom = [ grid.map( (row, key) => row[key] ) ];
    const testByDiagonalBottomToTop = [ grid.map( (row, key) => row[(row.length - 1) - key] ) ]

    const waysToWin = [
        testByRow,
        testByColumn,
        testByDiagonalTopToBottom,
        testByDiagonalBottomToTop
    ];

    return waysToWin.reduce( doWeHaveWinningCombination, undefined );
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
            let newGrid = update(this.state.grid, { [x] : { [y] : { $set: { player: this.currentPlayer, pos } } } } );
            const winningCells = getWinningCells(newGrid, this.currentPlayer);
            if(winningCells){
                this.setState({
                    winner: this.currentPlayer,
                    winningCells
                });
            }
            this.setState({ grid: newGrid });
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

