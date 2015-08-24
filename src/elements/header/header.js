'use strict';
var Header = Polymer({
    is: 'carbo-header',
    togglePanel:function(){
        var panel = this.$['carbo-header-panel'];
        var closePanel = this.$['close-header-panel'];

        if (this.isActive) {
            console.log('close')
            Polymer.Base.toggleClass('active', false, panel);
            this.isActive = false;
            Polymer.Base.toggleClass('active', false, closePanel);

        } else {
            console.log('open')
            Polymer.Base.toggleClass('active', true, panel);
            this.isActive = true;
            Polymer.Base.toggleClass('active', true, closePanel);
        }

    },

    properties: {
        greeting: {
            type: String,
            value: 'Welcome!',
            notify: true
        }
    }
});




//        window.addEventListener('WebComponentsReady', function () {
//
//            var headerLeftSection = document.getElementById('header-left-section');
//            var headerPanel = document.getElementById('carbo-header-panel');
//            var closeHeaderPanel = document.getElementById('close-header-panel');
//            var windowHeight = window.innerHeight;
//
//            var headerPanelStatus = 'inactive';
//
//            window.addEventListener('resize', function() {
//            console.log('resized')
//            windowHeight = window.innerHeight;
//            closeHeaderPanel.style.height = windowHeight;
//            });
//
//
//            headerLeftSection.addEventListener('click', function () {
//
//                if (headerPanelStatus === 'inactive') {
//                    headerPanelStatus = 'active';
//                    headerPanel.className = 'has-shadow active';
//                    closeHeaderPanel.className = 'active';
//                    closeHeaderPanel.style.height = windowHeight;
//                } else {
//                    headerPanelStatus = 'inactive';
//                    headerPanel.className = '';
//                    closeHeaderPanel.className = '';
//                }
//
//            });
//
//            closeHeaderPanel.addEventListener('click', function () {
//            headerPanelStatus = 'inactive';
//            headerPanel.className = '';
//            closeHeaderPanel.className = '';
//
//            });
//
//
//    //        var addScreenButton = document.getElementById('botao-lu');
//            var addScreenButton = document.getElementsByClassName('add-screen-button');
//            var carboSection = document.getElementsByClassName('carbo-section');
//
//            for (var i=0; i < addScreenButton.length; i++) {
//                addScreenButton[i].addEventListener('click', function (event) {
//                alert("foi");
//                    console.log(event);
//
//    //                event.srcElement.parent.
//    //          carboSection.innerHTML = '<div class="carbo-section-contents">';
//
//              });
//            }
//
//
//        });
