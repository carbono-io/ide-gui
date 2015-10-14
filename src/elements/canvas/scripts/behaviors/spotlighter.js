'use strict';

// HACK
// TODO: let spotlighter be hidden at start
exports.ready = function () {

    this.$.spotlighter.hide();
};

exports.spotlight = function (selector) {

    var spotlighter = this.$.spotlighter;

    this.getElementsData(selector)
        .then(function (elementsData) {
            var rects = elementsData.map(function (data) {
                return this.normalizeBoundingRect(data.rect);
            }.bind(this));

            console.log(rects);

            spotlighter.setTargetBoundingRects(rects);
            spotlighter.show();

        }.bind(this))
        .done();

};

exports.normalizeBoundingRect = function (rect) {
    // Calculate the rect of the iframe
    var iframeRect = this.$.iframe.getBoundingClientRect();

    // Calculate the position of the mouse
    // relative to the rect of the iframe
    var normalized =  {
        left: rect.left + iframeRect.left,
        right: rect.right + iframeRect.left,
        top: rect.top + iframeRect.top,
        bottom: rect.bottom + iframeRect.top,
        width: rect.width,
        height: rect.height,
    };

    return normalized;
};
