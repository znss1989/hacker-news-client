var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var TopStories = require('./TopStories.react.jsx');

var AppBody = React.createClass({
    render: function() {
        return (
            <div>
                <p>Content goes here...</p>
                <TopStories topStories={this.props.topStories} />
            </div>
        );
    }
});

module.exports = AppBody