'use strict';
// jshint unused:false

var getDeclarationType = require('./scripts/lib/get-declaration-type');
var groupDeclarations  = require('./scripts/lib/group-declarations');

Polymer({
    is: 'carbo-styles-list',

    properties: {
        selectorString: {
            type: String,
        },
        selectors: {
            type: Array,
        },

        declarations: {
            type: Array,
            notify: true,
            observer: '_handleDeclarationsChange',
        }
    },

    toggleClosedClass: function (event) {

        var groupNode = event.currentTarget.parentNode;
        var isClosed = groupNode.matches(".closed");

        if (isClosed === true) {
            Polymer.Base.toggleClass('closed', false, groupNode);
            isClosed = false;

        } else {
            Polymer.Base.toggleClass('closed', true, groupNode);
            isClosed = true;
        }
    },

    setClassName: function () {
        var iconName = this.$$('.style-preview-2');
        console.log(iconName);
    },

    isDeclarationOfType: function (declaration, type) {
        return getDeclarationType(declaration) === type;
    },

    _handleDeclarationsChange: function (declarations, old) {

        console.log(declarations);

        var groups = groupDeclarations(declarations);

        console.log(groups);

        this.set('declarationGroups', groups);
    },

    /**
     * Handles changes from all inputs
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleInputChange: function (event) {

        this.fire('style-declaration-changed', {
            selectorString: this.selectorString,
            selectors: this.selectors,
            declaration: event.model.declaration,
        });
    }

});
