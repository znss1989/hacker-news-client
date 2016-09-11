var React = require('react');

var AppAPI = require('../utils/AppAPI');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Story = require('../components/Story.react.jsx');

var NewStories = React.createClass({
    getDefaultProps: function() {
        return {
            newStories: []
        };
    },
    onScrollToBottom: function() {
        var stopLoading = true;
        var toggleStopLoading = function() {
            stopLoading = !stopLoading;
        };
        $(window).scroll(function() {
            if ($(this).scrollTop() + $(window).height() + 100 >= $(document).height()) {
                if (stopLoading == true) {
                    stopLoading = false;
                    console.log("scroll loading invoked...");
                    AppAPI.loadMoreNews(toggleStopLoading);
                }
            }
        });
    },
    offScrollToBottom: function() {
        $(window).off('scroll');
    },
    componentDidMount: function() {
        console.log("Tops did mount.");
        AppAPI.getNews(); // First get top story ids and then load initial top stories
        this.onScrollToBottom();
    },
    componentWillUnmount: function() {
        console.log("top unmounting...");
        this.offScrollToBottom();
        AppActions.clearTopStories();
    },
    render: function() {
        var newStories = this.props.newStories;
        var newStoriesHtml = newStories.map(function(newStory) {
            return (<Story key={newStory.id} story={newStory} />);
        });
        return (
            <div>
                {newStoriesHtml}
            </div>
        );
    }
});

module.exports = NewStories;