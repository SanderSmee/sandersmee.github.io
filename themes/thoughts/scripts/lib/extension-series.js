'use strict';

function series_filter(locals) {
    if (typeof locals.site.series === 'undefined') {
        const groupedSeries = locals.site.posts.reduce((acc, post) => {
            if (typeof post.series !== 'undefined') {
                const serie = post.series;
                if (!acc.hasOwnProperty(serie)) {
                    acc[serie] = [];
                }
                acc[serie].push(post);
            }
            return acc;
        }, {});

        const config = this.config.post_series;
        Object.values(groupedSeries).forEach((posts) => {
            posts.sort(function(left, right) {
                if (config.reverse_sort) {
                    return left.date.valueOf() - right.date.valueOf();
                }
                return right.date.valueOf() - left.date.valueOf();
            });
        });

        locals.site.series = groupedSeries;
    }
}

function post_in_series_list(currentPost) {
    const hexo = this;

    const postSeriesHtml = [];
    if (typeof currentPost.series === 'string') {
        const seriesPosts = hexo.site.series[currentPost.series];
        if (seriesPosts.length > 0) {
            postSeriesHtml.push('<aside class="sidebarblock post-series">');
            postSeriesHtml.push('<h6>', hexo.config.post_series.list_title.replace('@series@', currentPost.series), '</h6>');
            postSeriesHtml.push('<ol class="post-series-list">');

            seriesPosts.reduce((result, post) => {
                result.push('<li class="post-series-list-item"><a href="');
                result.push(isRunningInLocalServerMode() ? '/' + post.path : post.permalink);
                result.push(hexo.config.open_in_new_tab ? '" target="_blank">' : '">');
                result.push(post.title);
                result.push('</a></li>');
                return result;
            }, postSeriesHtml);

            postSeriesHtml.push('</ol></aside>');
        }
    }

    return postSeriesHtml.join('');
}

function isRunningInLocalServerMode() {
    return process.argv.indexOf('server') > -1 || process.argv.indexOf('s') > -1;
 }

module.exports = {
    series_filter,
    post_in_series_list
}
