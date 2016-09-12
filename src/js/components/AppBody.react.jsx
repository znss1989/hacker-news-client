var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var TopStories = require('./TopStories.react.jsx');
var NewStories = require('./NewStories.react.jsx');

var AppBody = React.createClass({
    getInitialState: function() {
        return {
            showNew: false,
            loading: true
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
    onLoadReady: function() {
        this.setState({
            loading: false
        });
    },
    render: function() {
        var loadingBar = (                
            <div className="load-10">
                <div className="bar"></div>
            </div>
        );
        var stories = this.state.showNew? <NewStories newStories={this.props.newStories} />: <TopStories topStories={this.props.topStories} />;
        return (
            <div className="container">
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className={this.state.showNew? "": "active"} onClick={this.onShowTop}><a href="#"><i className="iconfont">&#xe664;</i>Tops</a></li>
                    <li role="presentation" className={this.state.showNew? "active": ""} onClick={this.onShowNew}><a href="#"><i className="iconfont">&#xe63e;</i>Newest</a></li>
                </ul>
                <div className="stories">
                    {stories}
                </div>
                {loadingBar}
            </div>
        );
    }
});

module.exports = AppBody