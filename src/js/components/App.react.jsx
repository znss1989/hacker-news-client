var React = require('react');

var AppAPI = require('../utils/AppAPI');
var AppActions = require('../actions/AppActions');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppStore = require('../stores/AppStore');

var AppHeader = require('./AppHeader.react.jsx');
var AppBody = require('./AppBody.react.jsx');

function getAppState() {
    return {
        topStories: AppStore.getTopStories(),
        newStories: AppStore.getNewStories(),
    };
};

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    // Add change listerns to stores and get Ajax response
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },
    // Remove change listeners from stores
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getAppState());
    },
    render: function() {
        return (
            <div>
                <AppHeader />
                <AppBody topStories={this.state.topStories} newStories={this.state.newStories} />            
            </div>
        );
    }
});

module.exports = App;