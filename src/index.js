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
    });



})(document);
