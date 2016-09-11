var React = require('react');

var AppAPI = require('../utils/AppAPI');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Story = require('../components/Story.react.jsx');

var TopStories = React.createClass({
    getDefaultProps: function() {
        return {
            topStories: []
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
                    AppAPI.loadMoreTops(toggleStopLoading);
                }
            }
        });
    },
    offScrollToBottom: function() {
        $(window).off('scroll', 'window');
    },
    componentDidMount: function() {
        console.log("Tops did mount.");
        AppAPI.getTops(); // First get top story ids and then load initial top stories
        this.onScrollToBottom();
    },
    componentWillUnmount: function() {
        console.log("top unmounting...");
        this.offScrollToBottom();
        AppActions.clearTopStories();
    },
    shouldComponentUpdata: function() {},
    componentWillUpdata: function() {},
    render: function() {
        var topStories = this.props.topStories;
        var topStoriesHtml = topStories.map(function(topStory) {
            return (<Story key={topStory.id} story={topStory} />);
        });
        return (
            <div>
                {topStoriesHtml}
            </div>
        );
    }
});

module.exports = TopStories;