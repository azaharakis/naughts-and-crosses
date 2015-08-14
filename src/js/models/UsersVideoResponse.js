var { Video } = require('./Video');

class UsersVideoResponse {
    constructor(data) {
        this.usersVideos = data.mylist.map(v => new Video(v));
        this.recommendedVideos = data.recommendations.map(v => new Video(v));
    }
}

module.exports.UsersVideoResponse = UsersVideoResponse;