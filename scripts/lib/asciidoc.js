'use strict'

const asciidoctor = require('asciidoctor')();
const asciidoctorHtml5s = require('asciidoctor-html5s');
// const path = require('path');

// Register the HTML5s converter and supporting extension.
asciidoctorHtml5s.register();

const opts = {
    safe: 'safe',
    backend: 'html5s',
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
