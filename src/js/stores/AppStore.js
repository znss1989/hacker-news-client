var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI');

var CHANGE_EVENT = 'change';

var _topStories = [];
var _topsPage = 0;
var _newStories = [];
var _newsPage = 0;

var AppStore = assign({}, EventEmitter.prototype, {
    // Get/set private data at stores
    getTopStories: function() {
        return _topStories;
    },
    getTopsPage: function() {
        return _topsPage;
    },
    setTopsPage: function(page) {
        _topsPage = page;
    },
    getNewStories: function() {
        return _newStories;
    },
    getNewsPage: function() {
        return _newsPage;
    },
    setNewsPage: function(page) {
        _newsPage = page;
    },

    // Action driven methods
    saveTopStories: function(payload) {
        var stories = payload.items;
        if (!stories) {
            return;
        };
        _topStories = _topStories.concat(stories);
    },
    clearTops: function() {
        _topStories = [];
        _topsPage = 0;
        console.log("clearTops done.");
    },
    saveNewStories: function(payload) {
        var stories = payload.items;
        if (!stories) {
            return;
        }
        _newStories = _newStories.concat(stories);
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