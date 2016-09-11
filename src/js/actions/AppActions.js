var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    storeTopStories: function(payload) {
        var action = {
            actionType: AppConstants.APP_STORE_TOPS,
            payload: payload
        };
        AppDispatcher.dispatch(action);
    },
    loadMoreTops: function(callback) {
        var action = {
            actionType: AppConstants.APP_LOAD_MORE_TOPS,
            callback: callback
        };
        AppDispatcher.dispatch(action);
    },
    clearTopStories: function() {
        var action = {
            actionType: AppConstants.APP_CLEAR_TOPS,
        };
        AppDispatcher.dispatch(action);
    },
    storeNewStories: function(payload) {
        var action = {
            actionType: AppConstants.APP_STORE_NEWS,
            payload: payload
        };
        AppDispatcher.dispatch(action);
    }
};

module.exports = AppActions;