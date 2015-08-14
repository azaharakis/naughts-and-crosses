var ActionTypes = require('../Constants').ActionTypes;
var AppDispatcher = require('../AppDispatcher');
var APIUtils = require('../utils/APIUtils');

var ViewActionCreators = {
    loadVideos: () => {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_VIDEOS
        });
        APIUtils.loadVideos();
    }
};

module.exports = ViewActionCreators;
