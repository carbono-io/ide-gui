'use strict';
// jshint unused:false

/* globals _, Q */

Polymer({
    is: 'carbo-menu-grow-height-animation',
    behaviors: [
      Polymer.NeonAnimationBehavior
    ],
    configure: function(config) {
      var node = config.node;
      var rect = node.getBoundingClientRect();
      var height = rect.height;
      this._effect = new KeyframeEffect(node, [{
        height: (height / 2) + 'px'
      }, {
        height: height + 'px'
      }], this.timingFromConfig(config));
      return this._effect;
    }
});
Polymer({
  is: 'carbo-menu-grow-width-animation',
  behaviors: [
    Polymer.NeonAnimationBehavior
  ],
  configure: function(config) {
    var node = config.node;
    var rect = node.getBoundingClientRect();
    var width = rect.width;
    this._effect = new KeyframeEffect(node, [{
      width: (width / 2) + 'px'
    }, {
      width: width + 'px'
    }], this.timingFromConfig(config));
    return this._effect;
  }
});
Polymer({
  is: 'carbo-menu-shrink-width-animation',
  behaviors: [
    Polymer.NeonAnimationBehavior
  ],
  configure: function(config) {
    var node = config.node;
    var rect = node.getBoundingClientRect();
    var width = rect.width;
    this._effect = new KeyframeEffect(node, [{
      width: width + 'px'
    }, {
      width: width - (width / 20) + 'px'
    }], this.timingFromConfig(config));
    return this._effect;
  }
});
Polymer({
  is: 'carbo-menu-shrink-height-animation',
  behaviors: [
    Polymer.NeonAnimationBehavior
  ],
  configure: function(config) {
    var node = config.node;
    var rect = node.getBoundingClientRect();
    var height = rect.height;
    var top = rect.top;
    this.setPrefixedProperty(node, 'transformOrigin', '0 0');
    this._effect = new KeyframeEffect(node, [{
      height: height + 'px',
      transform: 'translateY(0)'
    }, {
      height: height / 2 + 'px',
      transform: 'translateY(-20px)'
    }], this.timingFromConfig(config));
    return this._effect;
  }
});

var ANIMATION_CUBIC_BEZIER = 'cubic-bezier(.3,.95,.5,1)';

Polymer({
    is: 'carbo-menu',
    behaviors: [
        Polymer.IronControlState
    ],  
    properties: {      
      
        /**
         * True if the content is currently displayed.
         */
        opened: {
          type: Boolean,
          value: false,
          notify: true,
          observer: '_openedChanged'
        },
        /**
         * The orientation against which to align the menu dropdown
         * horizontally relative to the dropdown trigger.
         */
        horizontalAlign: {
          type: String,
          value: 'left',
          reflectToAttribute: true
        },
        /**
         * The orientation against which to align the menu dropdown
         * vertically relative to the dropdown trigger.
         */
        verticalAlign: {
          type: String,
          value: 'top',
          reflectToAttribute: true
        },
        /**
         * A pixel value that will be added to the position calculated for the
         * given `horizontalAlign`. Use a negative value to offset to the
         * left, or a positive value to offset to the right.
         */
        horizontalOffset: {
          type: Number,
          value: -40,
          notify: true
        },
        /**
         * A pixel value that will be added to the position calculated for the
         * given `verticalAlign`. Use a negative value to offset towards the
         * top, or a positive value to offset towards the bottom.
         */
        verticalOffset: {
          type: Number,
          value: -20,
          notify: true
        },
        /**
         * Set to true to disable animations when opening and closing the
         * dropdown.
         */
        noAnimations: {
          type: Boolean,
          value: false
        },
        /**
         * Set to true to disable automatically closing the dropdown after
         * a selection has been made.
         */
        ignoreSelect: {
          type: Boolean,
          value: false
        },
        /**
         * An animation config. If provided, this will be used to animate the
         * opening of the dropdown.
         */
        openAnimationConfig: {
          type: Object,
          value: function() {
            return [{
              name: 'fade-in-animation',
              timing: {
                delay: 100,
                duration: 200
              }
            }, {
              name: 'carbo-menu-grow-width-animation',
              timing: {
                delay: 100,
                duration: 150,
                easing: ANIMATION_CUBIC_BEZIER
              }
            }, {
              name: 'carbo-menu-grow-height-animation',
              timing: {
                delay: 100,
                duration: 275,
                easing: ANIMATION_CUBIC_BEZIER
              }
            }];
          }
        },
        /**
         * An animation config. If provided, this will be used to animate the
         * closing of the dropdown.
         */
        closeAnimationConfig: {
          type: Object,
          value: function() {
            return [{
              name: 'fade-out-animation',
              timing: {
                duration: 150
              }
            }, {
              name: 'carbo-menu-shrink-width-animation',
              timing: {
                delay: 100,
                duration: 50,
                easing: ANIMATION_CUBIC_BEZIER
              }
            }, {
              name: 'carbo-menu-shrink-height-animation',
              timing: {
                duration: 200,
                easing: 'ease-in'
              }
            }];
          }
        },
        /**
         * This is the element intended to be bound as the focus target
         * for the `iron-dropdown` contained by `paper-menu-button`.
         */
        _dropdownContent: {
          type: Object
        }
    },


    listeners: {
      'dropdown.mouseleave': 'close',
      'iron-select': '_onIronSelect'
    },

   
    /**
     * When an `iron-select` event is received, the dropdown should
     * automatically close on the assumption that a value has been chosen.
     *
     * @param {CustomEvent} event A CustomEvent instance with type
     * set to `"iron-select"`.
     */
    _onIronSelect: function(event) {
        this.close();
    },


    /**
     * When the dropdown opens, the `paper-menu-button` fires `paper-open`.
     * When the dropdown closes, the `paper-menu-button` fires `paper-close`.
     *
     * @param {boolean} opened True if the dropdown is opened, otherwise false.
     * @param {boolean} oldOpened The previous value of `opened`.
     */
    _openedChanged: function() {
      
      this._dropdownContent = this.$.content;
       
    },

    ready:function(){
      //set element to fit into
      // this.fitInto = this.parentElement;
      this.$.dropdown.postionTarget =this.parentElement;
    },


    //open menu
    open:function(){
     

      if(this.offsetLeft > window.innerWidth - 250){
        this.horizontalOffset = -180;
      }

      

      this.$.dropdown.open();
      this.children[0].selectMe();

    },

    //close menu
    close:function(){
      this.$.dropdown.close();
      this.children[0].unselectAllBrothers()
    }    

});
