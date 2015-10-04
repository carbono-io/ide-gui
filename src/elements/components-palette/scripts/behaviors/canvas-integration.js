'use strict';

/**
 * Defines methods for integration with canvas
 */

/**
 * Retrieves data for insertion element.
 *
 * Selects an item within the focused element.
 * 
 * @param  {CSSSelector} insertionSelector
 * @return {Promise -> ElementData}      
 */
exports.getInsertionElementData = function (insertionSelector) {
    var canvas = this.canvas;

    if (!canvas) {
        throw new Error('No canvas for <carbo-components-palette>.getInsertionElementData');
    }

    var promise;

    if (insertionSelector) {
        // get children
        promise = canvas.getFocusTargetChildrenData(insertionSelector);
    } else {
        // get target itself
        promise = canvas.getFocusTargetData().then(function (d) {
            // convert into array of data
            return [d];
        });
    }

    return promise;
};

/**
 * Retrieves the schema for the form currently in focus
 * @return {Promise -> Schema} An object whose keys are properties and values are Types
 */
exports.getSchemaFromFocusedForm = function () {
    var canvas = this.canvas;

    if (!canvas) {
        throw new Error('No canvas for <carbo-components-palette>.getSchemaFromFocusedForm');
    }

    return canvas.getFocusTargetChildrenData('[name]')
        .then(function (inputsData) {

            return inputsData.reduce(function (res, data) {

                // TODO: String is hardcoded still :(
                res[data.attributes.name] = 'String';
                return res;

            }, {});
        });
};
