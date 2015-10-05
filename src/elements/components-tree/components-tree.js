'use strict';
// jshint unused:false

(function () {

    Polymer({
        is: 'carbo-components-tree',
        ready: function() {
            var arrow = this.$.arrow;
            // console.log(arrow);
            var componentContext = this;

            var isClosed = !this.closed;

            if (isClosed) {
                Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));
                isClosed = false;
            } else {
                Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));
                isClosed = true;
            }

            arrow.addEventListener('click', function(event) {

                event.stopPropagation();

                if (isClosed) {
                    Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));
                    isClosed = false;
//                    this._handleClick();
                } else {
                    Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));
                    isClosed = true;
                }
            });
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
