var { Video } = require('./Video');
var _ = require('lodash');

class VideoCollection{
    constructor(videos){
        this.videos = videos.map(v => new Video(v));
    }
    addVideo(video){
        this.videos = this.videos.concat( video );
    }
    findVideo(id){
        return _.findWhere(this.videos, {id});
    }
    removeVideo(id){
        this.videos = this.videos.filter( v => v.id !== id);
    }
    getSummary(){
        if(!this.videos.length){
            return "you have no videos :(";
        }
        return this.videos.map(v => v.title).join(', ')
    }
}

module.exports.VideoCollection = VideoCollection;