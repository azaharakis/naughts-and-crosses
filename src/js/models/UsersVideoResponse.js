var { VideoCollection } = require('./VideoCollection');

class UsersVideoResponse {
    constructor(data) {
        this.usersVideos = new VideoCollection(data.mylist);
        this.recommendedVideos = new VideoCollection(data.recommendations);
    }
}

module.exports.UsersVideoResponse = UsersVideoResponse;