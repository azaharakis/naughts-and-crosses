var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');

var ServerActionCreators = {
    loadedVideos: (videos) => {
        AppDispatcher.handleServerAction({
            type: ActionTypes.VIDEOS_LOADED,
            videos: videos
        });
    }
};

module.exports = ServerActionCreators;
