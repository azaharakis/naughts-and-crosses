var React = require('react');
module.exports = React.createClass({
    displayColor() {
        if (this.props.displayColor) {
            return this.props.color;
        }
    },
    render() {
        return (
            <div className="tic-tac-board__item" style={{background: this.displayColor()}} onClick={this.props.handleClick}>
                {this.props.children}
            </div>
        );
    }
});

