'use strict';

/**
 * Sets the spotlight upon an element
 * @param  {CSSSelector} selector
 */
exports.spotlight = function (selector) {

    var spotlighter = this.$.spotlighter;

    return this.getElementsData(selector)
        .then(function (elementsData) {
            var rects = elementsData.map(function (data) {
                return this._normalizeBoundingRect(data.rect);
            }.bind(this));

            spotlighter.setTargetBoundingRects(rects);
            spotlighter.show();

        }.bind(this));
};

/**
 * Hides the spotlighter
 */
exports.hideSpotlight = function () {
    this.$.spotlighter.hide();
};

/**
 * Shows the spotlighter
 */
exports.showSpotlight = function () {
    this.$.spotlighter.show();
};

/**
 * Calculates the bounding rect from a given rect within the iframe
 */
exports._normalizeBoundingRect = function (rect) {
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
