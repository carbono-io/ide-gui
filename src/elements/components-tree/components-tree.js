// jshint unused:false
'use strict';
var CarboComponentsTree = Polymer({
    is: 'carbo-components-tree',
    ready: function(){
        var componentItself = this.$$('#component-itself');
        console.log(componentItself);
        var componentContext = this;
        componentItself.addEventListener('click', function(event){
            console.log('clicaram em mim!');
            console.log(event);
            var currentClass = componentContext.$$('#component').className;
            if (currentClass == 'closed'){
                componentContext.$$('#component').className = '';
            } else {
                componentContext.$$('#component').className = 'closed';
            }
        });
    },
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
