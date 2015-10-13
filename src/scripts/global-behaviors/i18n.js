'use strict';

/**
 * Behavior for internationalization
 * Used in carbo-components that are aware of the main application scope
 */

exports.properties = {
    i18nService: {
        type: Object,
        notify: true,
        observer: 'handleI18nServiceChange',
    }
};

exports.handleI18nServiceChange = function (i18nService, old) {
    i18nService.on('i18n-initialized', this.handleLanguageChange.bind(this));

    i18nService.on('language-changed', this.handleLanguageChange.bind(this));
};

exports.handleLanguageChange = function (i18nService) {

    console.log('language-changed')
    console.log(i18nService.getLng());
    i18nService.translateObject(this.root);
};