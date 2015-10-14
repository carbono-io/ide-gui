'use strict';
// jshint unused:false

/* globals _, Q */

Polymer({
    is: 'carbo-menu-item',
    properties: {
      icon: {
        type: String,
        notify: true
      },
      text: {
        type: String,
        notify: true
      }
    },

    behaviors: [
        // Polymer.IronControlState,
        // Polymer.IronButtonState
    ], 

    listeners: {
      'click': '_closeMenu',
      'mouseover':'_hoverEffect',
    },

    selectMe: function(){
      this.classList.add("hover");
    },

    _closeMenu : function(event){
      this.unselectAllBrothers();
      this.parentElement.close();
    },

    unselectAllBrothers:function(){
      var brothers = this.parentElement.children;
      for(var element = 0 ; element < brothers.length ; element ++){
        brothers[element].classList.remove("hover");
      }
    },

    _hoverEffect:function(event){
      this.unselectAllBrothers();
      this.selectMe();
    }

});
