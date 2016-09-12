var React = require('react');

var AppAPI = require('../utils/AppAPI');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Story = React.createClass({
    getInitialState: function() {
        var story = this.props.story;
        return {
            id: story.id,
            title: story.title,
            by: story.by,
            url: story.url,
            deleted: story.deleted,
            time: story.time,
            score: story.score,
            comments: story.kids,
            read: false
        };
    },
    render: function() {
        var datetime = new Date(this.state.time * 1000);
        return (
            <div className="card p-l-1 p-r-1">
                <h6 className={this.state.deleted? "item-title deleted": "item-title"}>
                    {this.state.title + " "}
                    <a href={this.state.url}>
                        <i className="iconfont">&#xe619;</i>
                    </a>
                </h6>
                <p className="by">{this.state.score} points |
                    by <a href={"https://news.ycombinator.com/user?id=" + this.state.by}>{this.state.by}</a>
                    , at {datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString()}
                </p>
                <p>{this.state.comments? this.state.comments.length: 0} comments | <a href={"https://new.ycombinator.com/item?id=" + this.state.id}><i className="iconfont">&#xe612;</i> Join discusssion</a></p>
            </div>
        );
    }
});

module.exports = Story;