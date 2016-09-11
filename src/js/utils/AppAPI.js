var React = require('react');

var AppActions = require('../actions/AppActions');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppStore = require('../stores/AppStore');

// Url related definitions
var topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
var newStoriesUrl = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
var itemBaseURL = "https://hacker-news.firebaseio.com/v0/item/";
var itemPostfixUrl = ".json?print=pretty";
var itemUrl = "";

var _itemsPerPage = 15;
var _ids_top;
var _ids_new;

// Define API object
var AppAPI = {
    getTops: function() {
        var page = AppStore.getTopsPage();
        var payload = {};
        $.ajax(topStoriesUrl, {dataType: 'jsonp'})
            .done(function(data) {
                // Save the ids
                _ids_top = data;

                var initTopStories = [];
                var storyCount = _itemsPerPage;
                for (var i = 0; i < _itemsPerPage; ++i) {
                    itemUrl = itemBaseURL + _ids_top[i] + itemPostfixUrl;
                    $.ajax(itemUrl, {dataType: 'jsonp'})
                        .done(function(data) {
                            initTopStories.push(data);
                            --storyCount;
                        })
                        .fail(function() {
                            // Show info
                        });
                }
                // Switch to Promise methods later
                var timer = setInterval(function() {
                    if (storyCount == 0) {
                        payload.items = initTopStories;
                        AppActions.storeTopStories(payload);
                        ++page;
                        AppStore.setTopsPage(page);
                        clearInterval(timer);
                    }
                }, 200);
            })
            .fail(function() {
                // Show info
            });        
    },
    loadMoreTops: function(callback) {
        var page = AppStore.getTopsPage();
        var payload = {};
        var moreStories = [];
        var storyCount = _itemsPerPage;
        for (var i = 0; i < _itemsPerPage; ++i) {
            itemUrl = itemBaseURL + _ids_top[page * _itemsPerPage + i] + itemPostfixUrl;
            $.ajax(itemUrl, {dataType: 'jsonp'})
                .done(function(data) {
                    moreStories.push(data);
                    --storyCount;
                })
                .fail(function () {
                    // Show info
                });
        }
        var timer = setInterval(function() {
            if (storyCount == 0) {
                payload.items = moreStories;
                AppActions.storeTopStories(payload);
                ++page;
                AppStore.setTopsPage(page);
                callback();
                clearInterval(timer);
            }
        }, 200);
    },
    getNews: function() {
        var page = AppStore.getNewsPage();
        var payload = {};
        $.ajax(newStoriesUrl, {dataType: 'jsonp'})
            .done(function(data) {
                // Save the ids
                _ids_new = data;

                var initNewStories = [];
                var storyCount = _itemsPerPage;
                for (var i = 0; i < _itemsPerPage; ++i) {
                    itemUrl = itemBaseURL + _ids_new[i] + itemPostfixUrl;
                    $.ajax(itemUrl, {dataType: 'jsonp'})
                        .done(function(data) {
                            initNewStories.push(data);
                            --storyCount;
                        })
                        .fail(function() {
                            // Show info
                        });
                }
                // Switch to Promise methods later
                var timer = setInterval(function() {
                    if (storyCount == 0) {
                        payload.items = initNewStories;
                        AppActions.storeNewStories(payload);
                        ++page;
                        AppStore.setNewsPage(page);
                        clearInterval(timer);
                    }
                }, 200);
            })
            .fail(function() {
                // Show info
            });        
    },    
    loadMoreNews: function(callback) {
        var page = AppStore.getNewsPage();
        var payload = {};
        var moreStories = [];
        var storyCount = _itemsPerPage;
        for (var i = 0; i < _itemsPerPage; ++i) {
            itemUrl = itemBaseURL + _ids_new[page * _itemsPerPage + i] + itemPostfixUrl;
            $.ajax(itemUrl, {dataType: 'jsonp'})
                .done(function(data) {
                    moreStories.push(data);
                    --storyCount;
                })
                .fail(function () {
                    // Show info
                });
        }
        var timer = setInterval(function() {
            if (storyCount == 0) {
                payload.items = moreStories;
                AppActions.storeNewStories(payload);
                ++page;
                AppStore.setNewsPage(page);
                callback();
                clearInterval(timer);
            }
        }, 200);
    },
};

module.exports = AppAPI;