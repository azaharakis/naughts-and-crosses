var React = require('react/addons')
var Board = require('../../../../src/js/TicTacToe/Components/Board');
var Player = require('../../../../src/js/TicTacToe/Models/Player');

describe('Board', () => {
    var Component;
    var ReactTestUtils = React.addons.TestUtils;
    var players;
    beforeEach(() => {
         players = {
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
        };
        Component = ReactTestUtils.renderIntoDocument(<Board {...players}/>);
    });

    describe('picking a winner', () => {
        it('win by top row', () => {
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([1,0]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([2,0]);
            Component.setPlayersMove([0,2]);
            expect(Component.state.winner).toBe(players.player1);
        });

    })
});

