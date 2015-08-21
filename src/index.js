(function (document) {
    'use strict';
    
    var carbo = document.querySelector('#carbo');
    
    carbo.app = 'teste';
    
    carbo.route = 'start';
    var header = {
        name: 'header',
    };
    
    var tabNav = {
        name: 'tabNav',
        children: [
            { name: 'tab-1-button' },
            { name: 'tab-2-button' },
            { name: 'tab-3-button' },
            { name: 'tab-4-button' }
        ]
    };
    
    var tabBody = {
        name: 'tabBody',
        children: [
            { name: 'tab-1', children: [header, { name: 'content', children: [header] }] },
            { name: 'tab-2' },
            { name: 'tab-3' },
            { name: 'tab-4' },
        ]
    };
    
    var content = {
        name: 'content',
        children: [tabNav, tabBody]
    };
    
    var footer = {
        name: 'footer'
    };

    var body = {
        name: 'body',
        children: [header, content, footer]
    };

    var menu = {
        title: 'Menu',
        icon: 'backup'
    };



    carbo.AAAAAA = body;

    carbo.boxmenuitem = menu;

    window.addEventListener('WebComponentsReady', function () {
        
        var headerLeftSection = document.getElementById('header-left-section');
        var headerPanel = document.getElementById('carbo-header-panel');
        var closeHeaderPanel = document.getElementById('close-header-panel');
        var windowHeight = window.innerHeight;

        var headerPanelStatus = 'inactive';

        window.addEventListener('resize', function() {
        console.log('resized')
        windowHeight = window.innerHeight;
        closeHeaderPanel.style.height = windowHeight;
        });






        headerLeftSection.addEventListener('click', function () {

            if (headerPanelStatus === 'inactive') {
                headerPanelStatus = 'active';
                headerPanel.className = 'has-shadow active';
                closeHeaderPanel.className = 'active';
                closeHeaderPanel.style.height = windowHeight;
            } else {
                headerPanelStatus = 'inactive';
                headerPanel.className = '';
                closeHeaderPanel.className = '';
            }

        });

        closeHeaderPanel.addEventListener('click', function () {
        headerPanelStatus = 'inactive';
        headerPanel.className = '';
        closeHeaderPanel.className = '';

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
