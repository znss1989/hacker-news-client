var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI');

var CHANGE_EVENT = 'change';

var _topStories = [];

var AppStore = assign({}, EventEmitter.prototype, {
    // Get private data at stores
    getTopStories: function() {
        return _topStories;
    },

    // Action driven methods
    saveTopStories: function(payload) {
        var stories = payload.items;
        if (!stories) {
            return;
        };
        _topStories = _topStories.concat(stories);
    },

    // Default methods
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

module.exports = AppStore;