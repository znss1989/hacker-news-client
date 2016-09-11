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
            comments: story.kids
        };
    },
    render: function() {
        return (
            <div>
                <h6 className={this.state.deleted? "item-title deleted": "item-title"}>
                    {this.state.title}
                    <a href={this.state.url}>
                        <img src="./img/link.png" alt="link"/>
                    </a>
                </h6>
                <p className="by">{this.state.score} points | by {this.state.by}, at {this.state.time}</p>
                <p>{this.state.comments? this.state.comments.length: 0} comments now | <a href={"https://new.ycombinator.com/item?id=" + this.state.id}>Join</a></p>

            </div>
        );
    }
});

module.exports = Story;