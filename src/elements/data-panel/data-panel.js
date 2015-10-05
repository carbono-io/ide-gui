(function () {

    Polymer({
        is: 'carbo-data-panel',

        properties: {
            canvas: {
                type: Object,
                notify: true,
                observer: '_handleCanvasChange',
            }
        },

        listeners: {
            'data-changed': '_handleDataChange',
        },

        _handleDataChange: function (event) {
            console.log('data changed!!!!!!');
        },

        /**
         * Set up event listeners onto the
         * canvas component
         */
        _handleCanvasChange: function (canvas, oldCanvas) {

            // whenever the inspector is ready
            canvas.addEventListener(
                'canvas-inspector-ready',
                this.handleCanvasInspectorReady.bind(this)
            );
        },

        /**
         * Retrieves data about the entities
         * from the html
         */
        handleCanvasInspectorReady: function () {
            var canvas = this.get('canvas');

            canvas.getElementsData('form').then(function (data) {

                // get schema from forms
                var entitiesPromise = data.map(function (d) {

                    var inputSelector = [
                        '[carbono-uuid="',
                        d.attributes['carbono-uuid'],
                        '"]',
                        ' [name]'
                    ].join('');

                    return canvas.getElementsData(inputSelector)
                        .then(function (inputsData) {

                            return {
                                location: d.attributes.action,
                                properties: inputsData.map(function (i) {
                                    return {
                                        name: i.attributes.name,
                                        type: 'String',
                                    }
                                }),
                            };
                        });
                });

                return Q.all(entitiesPromise);
            }.bind(this))
            .then(function (entities) {
                this.set('entities', entities);
            }.bind(this))
            .done();
        },
    });

})();