'use strict';
(function () {

    Polymer({
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

})();


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
