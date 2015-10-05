(function () {
    'use strict';

    function convertToComponentTree(data) {
        var tree = {};

        // name
        tree.name = data.tagName;
        // uuid
        tree.uuidCSSSelector = '[carbono-uuid="' + data.attributes['carbono-uuid'] + '"]';

        tree.children = [];

        data.childNodes.forEach(function (child) {

            // only add to tree if it has a 'carbono-uuid'
            // do this to filter out nodes that were dinamically added
            // and are not part of the html code
            // 
            // TODO: evaluate if this logic should be here
            // or in the carbo-inspector method
            if (child.attributes['carbono-uuid']) {
                tree.children.push(convertToComponentTree(child));
            }
        });

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
            },

            /**
             * The canvas component
             * @type {Object}
             */
            canvas: {
                type: Object,
                notify: true,
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

        listeners: {
            'component-mouseover': 'handleComponentMouseover',
            'component-click': 'handleComponentClick'
        },

        handleComponentMouseover: function (e) {
            var canvas = this.get('canvas');

            if (!canvas) {
                throw new Error('No canvas for <components-tree-panel>');
            }

            // set hover
            canvas.hoverElementForSelector(e.detail.componentData.uuidCSSSelector);
        },

        handleComponentClick: function (e) {
            var canvas = this.get('canvas');

            if (!canvas) {
                throw new Error('No canvas for <components-tree-panel>');
            }

            // set focus
            canvas.focusElementForSelector(e.detail.componentData.uuidCSSSelector);
        }
    });

})();