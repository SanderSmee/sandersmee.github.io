/* global hexo */
'use strict';

const seriesLib = require('./lib/extension-series');
hexo.extend.filter.register('template_locals', seriesLib.series_filter);
hexo.extend.helper.register('posts_in_same_series_list', seriesLib.post_in_series_list);

hexo.extend.helper.register('structured_data', require('./lib/structured_data.js'));
