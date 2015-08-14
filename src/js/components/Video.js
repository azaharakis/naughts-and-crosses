var React = require('react');
var { Video } = require('../models/Video');

module.exports = React.createClass({
    propTypes:{
        video: React.PropTypes.instanceOf(Video).isRequired
    },
    render(){
        var video = this.props.video;
        return (
            <li className="video">
                <h3 className="video__heading">{video.title}</h3>
                <img className="video__img" src={video.img} />
            </li>
        );
    }
});