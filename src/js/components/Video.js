var React = require('react');
var { Video } = require('../models/Video');

module.exports = React.createClass({
    propTypes:{
        video: React.PropTypes.instanceOf(Video).isRequired
    },
    getInitialState(){
        return {
            modificationEnabled: false
        }
    },
    showModification(e){
        if(e.type === "mouseover") {
            this.setState({modificationEnabled: true});
        }else if(e.type === "mouseleave"){
            this.setState({modificationEnabled: false});
        }
    },
    render(){
        var video = this.props.video;
        var modifyClass = `video__action--${this.props.type}`;
        var label = this.props.type;
        return (
            <li className="video" onMouseOver={this.showModification} onMouseLeave={this.showModification}>
                <h3 className="video__heading">{video.title}</h3>
                <img className="video__img" src={video.img} />
                {this.state.modificationEnabled &&
                    <button className={`video__action ${modifyClass}`} onClick={() => this.props.handleAction(video.id)}>
                        {label}
                    </button>
                }
            </li>
        );
    }
});