var React = require('react');
var VideoStore = require('../stores/VideoStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var Video = require('./Video');

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

    renderCollection(collection, type, action){
        return collection.map(video => <Video key={video.id} type={type} video={video} />);
    },

    renderUI () {
        return (
            <div className="app">
                <div className="video-group">
                    <h2 className="video-group__heading">My List</h2>
                    <ul className="video-group__list">
                        {this.renderCollection(this.state.videos.usersVideos.videos, "remove")}
                    </ul>
                </div>
                <div className="video-group">
                    <h2 className="video-group__heading">Recommendations</h2>
                    <ul className="video-group__list">
                        {this.renderCollection(this.state.videos.recommendedVideos.videos, "add")}
                    </ul>
                </div>
                <div className="video-summary">
                    <h4 className="video-summary__heading">My list titles:</h4>
                    {this.state.videos.usersVideos.getSummary()}
                </div>
            </div>
        )
    },

    render () {
        if (!this.state.loaded)
            return <div>Loading...</div>;

        return this.renderUI();
    }
});

module.exports = App;
