var assign = require('react/lib/Object.assign');
var Dispatcher = require('flux').Dispatcher;
var PayloadSources = require('./Constants').PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {
    handleServerAction (action) {
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    handleViewAction (action) {
        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;
