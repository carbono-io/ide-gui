'use strict';

/**
 * Auxiliary functions
 */

/**
 * Converts arguments object into array object.
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function argsToArray(args) {
    return Array.prototype.slice.call(args, 0);
};
exports.argsToArray = argsToArray;

/**
 * Checks the arguments given against an array of error messages
 * @param  {Array} argDescriptions Array of descriptions for each of the 
 *                                 arguments passed in.
 * @param  {Arguments} args        Arguments object to be checked against
 * @return {Boolean}               If arguments are valid
 */
exports.validateArguments = function (argDescriptions, args) {

    var validation = {};

    // make sure args is an array
    args = _.isArray(args) ? args : argsToArray(args);

    argDescriptions.forEach(function (desc, argIndex) {

        if (typeof desc === 'string') {
            // desc is the error message
            if (!args[argIndex]) {
                throw new Error(desc);
            }

        } else if (typeof desc === 'object') {
            // desc has some properties describing how to validate the argument
            // {
            //     validate: function (argValue) {...},
            //     error: Boolean,
            //     warning: Boolean
            // }
            var validationResult = args[argIndex].validate(argValue);

            if (typeof validationResult === 'string') {
                // the validate function returns a string if 
                // there is an error
                validation.valid   = false;
                validation.message = validationResult;

                if (desc.error) {
                    throw new Error(isValid);
                } else {
                    console.warn(isValid);
                }
            } else {
                validation.valid = true;
            }
        }
    });

    // always return validation
    return validation;
};
