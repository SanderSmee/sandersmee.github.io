'use strict'

const asciidoctor = require('asciidoctor')();
// const path = require('path');

const opts = {
    safe: 'safe',
    attributes: {
        doctype: 'article',
        showtitle: false,
        icons: 'font',
        idprefix: '',
        idseparator: '-',
        sectids: false,
        'source-highlighter': 'highlight.js',
        'listing-caption': 'Listing'
    }
};

function render(data, options) {
    return asciidoctor.convert(data.text, opts);
}

module.exports = render;
