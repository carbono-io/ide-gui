'use strict';

/**
 * Defines behaviors related to showing component preview
 */

// function that makes box preview appear
exports.showPreview = function (event) {

    // input content dynamically,
    // according to hovered component

    this.toggleClass('show', true, this.$.preview);
    //        this.$.preview.style.transform = "translateX(0)";
    this.$.preview.style.display = "block";

    // get component items of index.js
    var componentItem = event.model.item;
    this.screens = componentItem.screens;
    this.title = componentItem.title;

    // get window's size dynamically
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // get hovered component
    var componentTarget = event.currentTarget;
    // get width of hovered component
    var componentTargetWidth = componentTarget.offsetWidth;
    // get height of hovered component
    var componentTargetHeight = componentTarget.offsetHeight;

    var preview = this.$.preview;
    // get preview box's size dynamically
    var previewWidth = preview.offsetWidth;
    var previewHeight = preview.offsetHeight;

    // get left-position of hovered component
    var componentTargetLeftPosition = componentTarget.offsetLeft;
    // get height-position of hovered component
    var componentTargetTopPosition = componentTarget.offsetTop;

    // calculate space available between hovered
    // component and bottom of screen
    var spaceToBottom = windowHeight - componentTargetTopPosition - componentTargetHeight;
    // calculate space available between hovered
    // component and right of screen
    var spaceToRight = windowWidth - componentTargetLeftPosition - componentTargetWidth;

    // x-axisp
    // calculate dynamically
    // left-position of preview box
    // according to space to right available
    if ((previewWidth - (componentTargetWidth * 5 / 6)) <= spaceToRight) {
        //            console.log("largura suficiente - colocar à direita");
        preview.style.left = componentTargetLeftPosition + (componentTargetWidth * 5 / 6) + "px";
    } else {
        //            console.log("largura insuficiente - colocar à esquerda");
        preview.style.left = componentTargetLeftPosition - (componentTargetWidth * 5 / 6) + "px";
    }

    // y-axis
    // calculate dynamically
    // top-position of preview box
    // according to space to bottom available
    if (previewHeight - componentTargetHeight <= spaceToBottom - componentTargetHeight) {
        preview.style.top = componentTargetTopPosition + "px";
//            console.log("altura suficiente");

    } else {
        preview.style.top = windowHeight - previewHeight - 72 + "px"; // 56 from the page-header and 16 from the margin-bottom of box
        //            console.log("altura insuf");
    }
};

exports.hidePreview = function (event) {
    this.toggleClass('show', false, this.$.preview);
};

// function that makes box preview visible while mouse hovered
// it's a good idea to apply this function only if component has more pages
exports.handlePreviewMouseOver = function(event) {
    this.toggleClass('show', true, this.$.preview);
};