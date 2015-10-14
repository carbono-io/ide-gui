'use strict';

Polymer({
    is: 'carbo-panel-box',
    
    properties: {
        state: {
            type: String,
            notify: true,
            value: 'hidden',
        }
    },

    listeners:{
        'menuButton.click':'openMenu'
    },

    openMenu: function(){
        this.$.menu.open();
        // this.set("menuOpened" , (this.get("menuOpened")) ? false : true );
    }

});
