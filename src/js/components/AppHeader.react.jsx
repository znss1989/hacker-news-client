var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AppHeader = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hacker News</h1>
            </div>
        );
    }
});

module.exports = AppHeader;