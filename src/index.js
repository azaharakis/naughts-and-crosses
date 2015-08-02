require('./scss/index.scss');
var React = require('react');
var TicTackToe = require('./js/TicTacToe');

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