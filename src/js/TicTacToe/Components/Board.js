var React = require('react');
var GridItem = require('./GridItem');

function generateEmptyGrid() {
    return [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];
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
    doWeHaveAWinner() {
        let currentGrid = this.state.grid;

        function doesCellBelongToCurrentPlayer(cell) {
            return (cell && cell.BelongsToPlayer.marker === this.currentPlayer.marker);
        }

        function filterForWinner(arr) {
            if (arr.filter(doesCellBelongToCurrentPlayer, this).length === arr.length) {
                this.setState({
                    winner: this.currentPlayer,
                    winningCells: arr
                });
            }
        }

        //Win By Row
        currentGrid.forEach( filterForWinner, this);

        //Win by Column
        for (let i = 0; i < this.state.grid.length; i++) {
            let column = [];
            this.state.grid.forEach((row) => {
                column.push(row[i]);
            });
            filterForWinner.call(this, column);
        }
        //Win by cross section
        let crossSectionTopToBottom = [];
        let crossSectionBottomToTop = [];
        this.state.grid.forEach((row, index) => {
            crossSectionTopToBottom.push(row[index]);
            crossSectionBottomToTop.push(row[(row.length - 1) - index]);
        });
        filterForWinner.call(this, crossSectionTopToBottom);
        filterForWinner.call(this, crossSectionBottomToTop);

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
                player: this.currentPlayer,
                pos: pos
            };
            this.setState({
                grid: newGrid
            });
            this.doWeHaveAWinner();
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
        return this.state.grid.map((row, rowKey) => {
            return (
                <div key={rowKey} className="tic-tac-board__row">
                    {row.map((cell, itemKey) => {

                        let displayColor = false;

                        let player = (cell) ? cell.player : undefined;
                        if (this.state.winningCells) {
                            this.state.winningCells.forEach((cell) => {
                                if (rowKey === cell.pos[0] && itemKey === cell.pos[1]) {
                                    displayColor = true;
                                }
                            })
                        }

                        return (
                            <GridItem {...player} displayColor={displayColor} handleClick={this.setPlayersMove.bind(this, [rowKey, itemKey])} key={`${itemKey}-${rowKey}`} >
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

