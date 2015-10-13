/**
 * i18n service
 */

// native dependencies
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function I18NService() {
    var i18nextOptions = {
        fallbackLng: 'en',
        // Locales that are loadable
        lngWhitelist: ['pt', 'en']
    };

    i18n.init(i18nextOptions, this._handleI18NextInitializeReady.bind(this));
}

// Let I18NService inherit from event emitter
util.inherits(I18NService, EventEmitter);

/**
 * The callback called immediately after the i18n init is done
 * @param  {[type]} err [description]
 * @param  {[type]} t   [description]
 * @return {[type]}     [description]
 */
I18NService.prototype._handleI18NextInitializeReady = function (err, t) {


    // set methods
    this.translateObject = i18n.translateObject;
    this.t = t;

    this.translateObject(document);
    
    this.emit('i18n-initialized', this);
};



module.exports = I18NService;
