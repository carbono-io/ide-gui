(function (document) {
    'use strict';
    
    var carbo = document.querySelector('#carbo');
    
    carbo.app = 'teste';
    
    carbo.route = 'start';
    
    
    window.addEventListener('WebComponentsReady', function () {
        
        var headerLeft = document.getElementById('header-left');
        var headerPanel = document.getElementById('carbo-header-panel');


        var headerPanelStatus = 'inactive';

        headerLeft.addEventListener('click', function () {

            if (headerPanelStatus === 'inactive') {
                headerPanelStatus = 'active';
                headerPanel.className = 'has-shadow active';
            } else {
                headerPanelStatus = 'inactive';
                headerPanel.className = '';
            }

        });
    });



})(document);
