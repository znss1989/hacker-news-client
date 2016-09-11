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
        var stories = this.state.showNew? <NewStories newStories={this.props.newStories} />: <TopStories topStories={this.props.topStories} />;
        return (
            <div>
                <button onClick={this.onShowTop}>Tops</button>
                <button onClick={this.onShowNew}>Newest</button>
                <span>Content goes here...</span>
                {stories}
            </div>
        );
    }
});

module.exports = AppBody