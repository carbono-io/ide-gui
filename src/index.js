(function (document) {
    'use strict';
    
    var carbo = document.querySelector('#carbo');
    
    carbo.app = 'teste';
    
    carbo.route = 'start';
    
    
    window.addEventListener('WebComponentsReady', function () {
        
        var headerLeftSection = document.getElementById('header-left-section');
        var headerPanel = document.getElementById('carbo-header-panel');


        var headerPanelStatus = 'inactive';

        headerLeftSection.addEventListener('click', function () {

            if (headerPanelStatus === 'inactive') {
                headerPanelStatus = 'active';
                headerPanel.className = 'has-shadow active';
            } else {
                headerPanelStatus = 'inactive';
                headerPanel.className = '';
            }

        });

//        var addScreenButton = document.getElementById('botao-lu');
        var addScreenButton = document.getElementsByClassName('add-screen-button');
        var carboSection = document.getElementsByClassName('carbo-section');

        for (var i=0; i < addScreenButton.length; i++) {
            addScreenButton[i].addEventListener('click', function (event) {
            alert("foi");
                console.log(event);

//                event.srcElement.parent.
//          carboSection.innerHTML = '<div class="carbo-section-contents">';

          });
        }


    });








})(document);
