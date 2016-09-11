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
        // Respond to APP_LOAD_MORE_TOPS action:
        case AppConstants.APP_LOAD_MORE_TOPS:
            AppStore.loadMoreTops()
            break;
        // Respond to APP_REFRESH_TOPS action:
        case AppConstants.APP_REFRESH_TOPS:
            AppStore.refreshTops();
            break;

        // Respond to ...
        default:
            return true;
    };
    AppStore.emitChange();
});

module.exports = AppDispatcher;