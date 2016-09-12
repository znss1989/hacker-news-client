var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AppHeader = React.createClass({
    render: function() {
        return (
            <div className="container page-header m-b-3">
                <h1>Hacker News <small>by Y Combinator</small></h1>
            </div>
        );
    }
});

module.exports = AppHeader;