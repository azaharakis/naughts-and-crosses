var AppDispatcher = require('../AppDispatcher');
var { EventEmitter } = require('events');
var { ActionTypes } = require('../Constants');
var { UsersVideoResponse } = require('../models/UsersVideoResponse');
var assign = require('react/lib/Object.assign');


var events = new EventEmitter();
var CHANGE_EVENT = 'CHANGE';

var state = {
    videos: {},
    errors: {},
    loaded: false
};

function setState(newState) {
    assign(state, newState);
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
            setState({
                loaded: true,
                videos: new UsersVideoResponse(action.videos)
            });
            break;
    }
});

module.exports = VideoStore;
