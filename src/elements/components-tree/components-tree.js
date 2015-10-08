'use strict';
// jshint unused:false

(function () {

    Polymer({
        is: 'carbo-components-tree',
        ready: function() {
            var arrow = this.$.arrow;
            // console.log(arrow);
            var componentContext = this;

            // var isClosed = !this.closed;

            // if (isClosed) {
            //     Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));

            //     this.set('component.closed', false);

            //     isClosed = false;
            // } else {
            //     Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));

            //     this.set('component.closed', true);

            //     isClosed = true;
            // }

            arrow.addEventListener('click', function(event) {

                event.stopPropagation();



                var closed = this.get('component.closed') || false;

                if (closed) {
                    this.set('component.closed', false);
                    this.fire('component-click', {
                        componentData: this.component
                    });
                } else {
                    this.set('component.closed', true);
                }


                // if (this.get('component.closed')) {
                //     // Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));

                //     this.set('component.closed', false);

                //     // isClosed = false;
                // } else {
                //     Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));

                //     this.set('component.closed', true);

                //     isClosed = true;
                // }

            }.bind(this));
        },

        properties: {
            component: {
                type: Object,
                notify: true,
            },
            closed: Boolean,

            mouseoverHandler: {
                type: Function,
                notify: false
            }
        },

        listeners: {
            'mouseover': '_handleMouseover',
            'click': '_handleClick',
            'component-selected': '_handleComponentSelected'
        },

        observers: [
            '_componentSelectedChanged(component.selected)',
            '_componentClosedChanged(component.closed)',
        ],

        _componentSelectedChanged: function (isSelected) {
            Polymer.Base.toggleClass('active', isSelected, this.$$('#hoverer'));
        },

        _componentClosedChanged: function (isClosed) {
            Polymer.Base.toggleClass('closed', isClosed, this.$$('#component'));
        },

        /**
         * Handles mouseover
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _handleMouseover: function (e) {
            e.stopPropagation();

            this.fire('component-mouseover', {
                componentData: this.component
            });
        },

        _handleClick: function (e) {
            e.stopPropagation();

            this.fire('component-click', {
                componentData: this.component
            });
        }
    });

})();
