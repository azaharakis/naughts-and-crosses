var xhr = require('./xhr');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var APIUtils = {
  loadVideos () {
    xhr.getJSON(`${API}/videos`).done( data => {
        ServerActionCreators.loadedVideos(data);
    });
  }
};

module.exports = APIUtils;
