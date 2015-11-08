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

    describe('win by row', function() {

        it('top', function(){
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([1,1]);
            Component.setPlayersMove([1,0]);
            Component.setPlayersMove([2,1]);
            Component.setPlayersMove([2,0]);
            expect(Component.state.winner).toBe(players.player1);
        });

        it('middle', function(){
            Component.setPlayersMove([1,0]);
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([1,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([1,2]);
            expect(Component.state.winner).toBe(players.player1);
        });

        it('bottom', function(){
            Component.setPlayersMove([2,0]);
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([2,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([2,2]);
            expect(Component.state.winner).toBe(players.player1);
        });
    });

    describe('win by column', function () {
        it('left', function () {
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([1,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([1,2]);
            Component.setPlayersMove([0,2]);
            expect(Component.state.winner).toBe(players.player1);
        });

        it('middle', function () {
            Component.setPlayersMove([1,0]);
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([1,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([1,2]);
            expect(Component.state.winner).toBe(players.player1);
        });

        it('right', function () {
            Component.setPlayersMove([2,0]);
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([2,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([2,2]);
            expect(Component.state.winner).toBe(players.player1);
        });
    });

    describe('win by cross section', function() {
        it('top left to bottom right', function () {
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([0,2]);
            Component.setPlayersMove([1,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([2,2]);
            expect(Component.state.winner).toBe(players.player1);
        });

        it('bottom left to top right', function () {
            Component.setPlayersMove([0,2]);
            Component.setPlayersMove([0,0]);
            Component.setPlayersMove([1,1]);
            Component.setPlayersMove([0,1]);
            Component.setPlayersMove([2,0]);
            expect(Component.state.winner).toBe(players.player1);
        });
    });
});

