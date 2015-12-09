require('./scss/index.scss');
const React = require('react');
const TicTackToe = require('./js/TicTacToe');

var App = React.createClass({
    render(){
        return (
            <div>
                <TicTackToe />
            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
