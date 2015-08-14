var React = require('react');
var VideoStore = require('../stores/VideoStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
    getInitialState () {
        return VideoStore.getState();
    },

    handleChange () {
        this.setState(VideoStore.getState());
    },

    componentDidMount () {
        VideoStore.addChangeListener(this.handleChange);
        ViewActionCreators.loadVideos();
    },

    componentWillUnmount () {
        VideoStore.removeChangeListener(this.handleChange);
    },

    renderUI () {
        return this.state.videos.usersVideos.map(video => <li>Video goes here</li>);
    },

    render () {
        if (!this.state.loaded)
            return <div>Loading...</div>;

        return (
            <div>
                <ul>{this.renderUI()}</ul>
            </div>
        );
    }
});

module.exports = App;
