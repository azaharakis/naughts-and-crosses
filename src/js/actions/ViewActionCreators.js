var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');
var APIUtils = require('../utils/APIUtils');

var ViewActionCreators = {
    loadVideos: () => {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_VIDEOS
        });
        APIUtils.loadVideos();
    },
    removeVideoFromList: (id) => {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_VIDEO_FROM_LIST,
            id
        })
    },
    addVideoToList: (id) => {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_VIDEO_TO_LIST,
            id
        })
    }
};

module.exports = ViewActionCreators;
