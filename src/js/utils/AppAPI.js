var React = require('react');

var AppActions = require('../actions/AppActions');
var AppDispatcher = require('../dispatcher/AppDispatcher');

// Url related definitions
var topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
var itemBaseURL = "https://hacker-news.firebaseio.com/v0/item/";
var itemPostfixUrl = ".json?print=pretty";
var itemUrl = "";

var _itemsPerPage = 15;
var _ids_top;
var _page = 0;

// Define API object
var AppAPI = {
    getTops: function() {
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
                        ++_page;
                        clearInterval(timer);
                    }
                }, 200);
            })
            .fail(function() {
                // Show info
            });        
    },
    loadMoreTops: function(callback) {
        var payload = {};
        var moreStories = [];
        var storyCount = _itemsPerPage;
        for (var i = 0; i < _itemsPerPage; ++i) {
            itemUrl = itemBaseURL + _ids_top[_page * _itemsPerPage + i] + itemPostfixUrl;
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
                ++_page;
                callback();
                clearInterval(timer);
            }
        }, 200);
    },
};

module.exports = AppAPI;