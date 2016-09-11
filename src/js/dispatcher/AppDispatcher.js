var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppStore = require('../stores/AppStore');
var AppConstants = require('../constants/AppConstants');

var AppDispatcher = assign(new Dispatcher(), {
    handleViewAction: function(action) {
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        // Respond to APP_STORE_TOPS action:
        case AppConstants.APP_STORE_TOPS:
            AppStore.saveTopStories(action.payload);
            break;
        // Respond to APP_CLEAR_TOPS action:
        case AppConstants.APP_CLEAR_TOPS:
            AppStore.clearTops();
            break;
        // Respond to APP_STORE_NEWS action:
        case AppConstants.APP_STORE_NEWS:
            AppStore.saveNewStories(action.payload);
            break;
        // Respond to APP_CLEAR_NEWS action:
        case AppConstants.APP_CLEAR_NEWS:
            AppStore.clearNews();
            break;

        // Respond to ...
        default:
            return true;
    };
    AppStore.emitChange();
});

module.exports = AppDispatcher;