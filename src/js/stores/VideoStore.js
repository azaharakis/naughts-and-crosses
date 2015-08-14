var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var { UsersVideoResponse } = require('../models/UsersVideoResponse');
var assign = require('react/lib/Object.assign');


var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
    store: {},
    errors: {},
    loaded: false
};

function update(cb){
    cb();
    events.emit(CHANGE_EVENT);
}

var VideoStore = {
    addChangeListener (fn) {
        events.addListener(CHANGE_EVENT, fn);
    },

    removeChangeListener (fn) {
        events.removeListener(CHANGE_EVENT, fn);
    },

    getState () {
        return state;
    }
};

VideoStore.dispatchToken = AppDispatcher.register((payload) => {
    var { action } = payload;
    switch (action.type) {
        case ActionTypes.VIDEOS_LOADED:
            update(() => {
                assign(state,{
                    loaded: true,
                    store: new UsersVideoResponse(action.videos)
                });
            });
            break;
        case ActionTypes.REMOVE_VIDEO_FROM_LIST:
            update(() => state.store.usersVideos.removeVideo(action.id));
            break;
        case ActionTypes.ADD_VIDEO_TO_LIST:
            update(() => {
                var videoToAdd = state.store.recommendedVideos.findVideo(action.id);
                if(state.store.usersVideos.findVideo(videoToAdd.id)){
                    console.warn(`${videoToAdd.title} already exists in your list`);
                }else{
                    state.store.usersVideos.addVideo( videoToAdd );
                }
            });
            break;
    }
});

module.exports = VideoStore;
