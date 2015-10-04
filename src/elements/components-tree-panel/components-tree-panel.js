(function () {
    'use strict';

    function convertToComponentTree(data) {
        var tree = {};

        tree.name = data.tagName;

        tree.children = data.childNodes.map(convertToComponentTree);

        return tree;
    }

    Polymer({
        is: 'carbo-components-tree-panel',

        properties: {

            /**
             * The element tree
             * @type {Object}
             */
            activeElementTreeData: {
                type: Object,
                notify: true,
                observer: '_handleActiveElementTreeDataChange'
            },

            /**
             * The focused element data
             */
            focusedElementData: {
                type: Object,
                notify: true,
                observer: '_handleFocusChange',
            },

            /**
             * The hovered element data
             */
            hoveredElementData: {
                type: Object,
                notify: true,
                observer: '_handleHoverChange',
            }
        },

        _handleActiveElementTreeDataChange: function (activeElementTreeData, oldActiveElementTreeDataChange) {

            if (activeElementTreeData) {

                // parse the tree
                var tree = convertToComponentTree(activeElementTreeData);

                this.set('tree', tree);
            }
        },

        _handleFocusChange: function (focusedElementData, oldFocus) {
            // console.log(focusedElementData);
        },

        _handleHoverChange: function (hoveredElementData, oldHover) {
            // console.log(hoveredElementData);
        },
    });

})();