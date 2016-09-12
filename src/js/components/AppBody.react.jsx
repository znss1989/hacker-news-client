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
            <div className="container">
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className={this.state.showNew? "": "active"} onClick={this.onShowTop}><a href="#">Tops</a></li>
                    <li role="presentation" className={this.state.showNew? "active": ""} onClick={this.onShowNew}><a href="#">Newest</a></li>
                </ul>
                <div className="stories">
                    {stories}
                </div>
            </div>
        );
    }
});

module.exports = AppBody