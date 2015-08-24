// jshint unused:false
'use strict';
var CarboComponentsTree = Polymer({
    is: 'carbo-components-tree',
    ready: function(){
        var componentItself = this.$$('#component-itself');
        console.log(componentItself);
        var componentContext = this;

        var isClosed = !this.closed;

        if (isClosed) {
            console.log('open')
            Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));
            isClosed = false;
        } else {
            console.log('close')
            Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));
            isClosed = true;
        }

        componentItself.addEventListener('click', function(event){

            if (isClosed) {
                console.log('open')
                Polymer.Base.toggleClass('closed', false, componentContext.$$('#component'));
                isClosed = false;
            } else {
                console.log('close')
                Polymer.Base.toggleClass('closed', true, componentContext.$$('#component'));
                isClosed = true;
            }


            // componentContext.updateStyles();
        });
    },

    properties: {

        closed: Boolean,

    }
});















































// TODO: setup event listeners

// listeners: {
//     'banner.tap': 'handleBannerTap'
// },

// handleBannerTap: function handleBannerTap(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (this.isOpen) {
//         this.$.component.className += ' closed';
//         this.isOpen = false;
//     } else {
//         this.$.component.className = this.$.component.className.replace('closed', '');
//         this.isOpen = true;
//     }
// },

// properties: {
//     component: {
//         type: Object,
//         notify: true,
//     },
//     isOpen: {
//         type: Boolean,
//         default: true,
//         notify: true,
//     }
// },
