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
    },
    refreshTopStories: function() {
        var action = {
            actionType: AppConstants.APP_REFRESH_TOPS,
        }
    },
};

module.exports = AppActions;