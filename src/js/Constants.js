var keyMirror = require('react/lib/keyMirror');

module.exports = {
    API: '//Some/API/sorry/this/is/restful/:(',

    ActionTypes: keyMirror({
        VIDEOS_LOADED: null,
        LOAD_VIDEOS: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};
