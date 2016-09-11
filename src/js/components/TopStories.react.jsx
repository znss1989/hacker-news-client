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
        this.onScrollToBottom();
    },
    componentUnMount: function() {
        this.offScrollToBottom();
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