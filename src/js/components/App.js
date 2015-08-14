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

    renderCollection(collection){
        return collection.map(video => <Video key={video.id} video={video} />);
    },

    renderUI () {
        return (
            <div className="app">
                <div className="video-group">
                    <h2 className="video-group__heading">My List</h2>
                    <ul className="video-group__list">
                        {this.renderCollection(this.state.videos.usersVideos)}
                    </ul>
                </div>
                <div className="video-group">
                    <h2 className="video-group__heading">Recommendations</h2>
                    <ul className="video-group__list">
                        {this.renderCollection(this.state.videos.recommendedVideos)}
                    </ul>
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
