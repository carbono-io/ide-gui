'use strict';

/**
 * Behavior for internationalization
 * Used in carbo-components that are aware of the main application scope
 */

exports.properties = {
    i18n: {
        type: Object,
        notify: true,
        observer: 'handleI18nServiceChange',
    }
};

exports.handleI18nServiceChange = function (i18n, old) {
    i18n.on('i18n-initialized', function () {
        i18n.translateObject(this.root);
    }.bind(this))
};

exports.handleLanguageChange = function () {
    i18n.translateObject(this.root);
};