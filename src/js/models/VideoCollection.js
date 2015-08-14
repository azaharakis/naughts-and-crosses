var { Video } = require('./Video');

class VideoCollection{
    constructor(videos){
        this.videos = videos.map(v => new Video(v));
    }
    getSummary(){
        return this.videos.map(v => v.title).join(', ')
    }
}

module.exports.VideoCollection = VideoCollection;