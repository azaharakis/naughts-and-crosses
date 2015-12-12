require('./scss/index.scss');
const React = require('react');
const ReactDOM = require('react-dom');
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

ReactDOM.render(<App />, document.getElementById('app'));
