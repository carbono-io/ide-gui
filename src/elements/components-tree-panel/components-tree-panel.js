(function () {
    'use strict';

    function convertToComponentTree(data, parent) {
        var tree = {};

        // name
        tree.name = data.tagName;

        tree.selected = false;
        tree.closed = true;

        tree.path = parent ? 
            parent.path + '.children.' + (parent.children.length) :
            'tree';

        tree['carbono-uuid'] = data.attributes['carbono-uuid'];

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
                tree.children.push(convertToComponentTree(child, tree));
            }
        });

        return tree;
    }

    function searchTree(element, uuid){
         if(element['carbono-uuid'] == uuid){
              return element;
         }else if (element.children != null){
              var result = null;
              for(var i=0; result == null && i < element.children.length; i++){
                   result = searchTree(element.children[i], uuid);
              }
              return result;
         }
         return null;
    }

    /**
     * Retrieves the component in the tree
     * @param  {[type]} tree [description]
     * @param  {[type]} uuid [description]
     * @return {[type]}      [description]
     */
    function getPathToComponentInTree(tree, uuid) {
        var str = 'tree';

        if (tree['carbono-uuid'] === uuid) {
            return str;
        } else {
            tree.children.forEach(function (child) {
                str += getPathToComponentInTree(tree.children)
            })
        }
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

        ready: function () {


            this.boxmenuitemComponents = {
                items: [
                    { icon: 'add', title: 'nova tela' },
                ]
            };
        },

        _handleActiveElementTreeDataChange: function (activeElementTreeData, oldActiveElementTreeDataChange) {

            if (activeElementTreeData) {

                // parse the tree
                var tree = convertToComponentTree(activeElementTreeData);

                this.set('tree', tree);
            }
        },

        _handleFocusChange: function (focusedElementData, oldFocus) {

            if (this.get('tree')) {

                var tree = this.get('tree');

                var cp = searchTree(
                    tree,
                    focusedElementData.attributes['carbono-uuid']
                );

                // unset the last path
                var currentSelectedPath = this.get('currentSelectedPath') || 'tree';
                this.set(currentSelectedPath + '.selected', false);

                // save current active
                this.set('currentSelectedPath', cp.path);

                var split = cp.path.split('.children');
                console.log(split);

                var pathToOpen = '';

                split.forEach(function (item, index) {

                    pathToOpen += index > 0 ? '.children' + item : item;

                    console.log(pathToOpen);

                    console.log(this.get(pathToOpen + '.closed'));

                    this.set(pathToOpen + '.closed', false);

                }.bind(this));

                this.set(cp.path + '.selected', true);
            }
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
        },
    });

})();
