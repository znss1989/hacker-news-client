var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var TopStories = require('./TopStories.react.jsx');
var NewStories = require('./NewStories.react.jsx');

var AppBody = React.createClass({
    getInitialState: function() {
        return {
            showNew: false
        };
    },
    onShowTop: function(evt) {
        this.setState({
            showNew: false
        });
        // Refresh data for news when showing tops
    },
    onShowNew: function(evt) {
        this.setState({
            showNew: true
        });
    },
    render: function() {
        return (
            <div>
                <button onClick={this.onShowTop}>Tops</button>
                <button onClick={this.onShowNew}>Newest</button>
                <span>Content goes here...</span>
                {this.state.showNew? <NewStories />: <TopStories topStories={this.props.topStories} />}
            </div>
        );
    }
});

module.exports = AppBody