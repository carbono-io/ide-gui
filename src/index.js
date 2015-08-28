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
//        title: 'Menu',
//        icon: 'backup',
        items: [
            { icon: 'backup', title: 'menu 1' },
            { icon: 'close', title: 'menu 2' },
            { icon: 'backup', title: 'menu 3' },
            { icon: 'backup', title: 'menu 4' }
        ]
    };

    var components = [
        {
            title: "Formulário cujo nome é bem grande mesmo",
            icon: "assignment",
            screens: [
                {
                    url: "https://placehold.it/200x500",
                    screensCaption: "tela1"
                }
            ],
        },
        {
            title: "Galeria",
            icon: "view-agenda",
            screens: [
                {
                    url: "https://bttgeraes.files.wordpress.com/2006/08/paisage-perdidos.jpg",
                    screensCaption: "tela1"
                },
                {
                    url: "https://images.tcdn.com.br/img/img_prod/210907/havaianas_slim_paisage_fever_1324_1_20140724125126.jpg",
                    screensCaption: "tela2"
                },

            ],
        },
        {
            title: "Gráfico 1",
            icon: "editor:insert-chart",
            screens: [
                {
                    url: "http://artistsinspireartists.com/wp-content/uploads/2011/04/Dance-Photography-14.png",
                    screensCaption: "tela1"
                },
                {
                    url: "http://wikidanca.net/wiki/images/7/7d/Grupo_corpo.jpg",
                    screensCaption: "tela2"
                },

            ],
        },
        {
            title: "Gráfico 2",
            icon: "editor:insert-chart",
            screens: [
                {
                    url: "http://artistsinspireartists.com/wp-content/uploads/2011/04/Dance-Photography-14.png",
                    screensCaption: "tela1"
                },
            ],
        },

    ]

    var section1 = {
        title: 'SEÇÃO 1',
        screens: [
        { title: 'Tela 1' },
        { title: 'Tela 2' }
        ]
    }

    var section2 = {
        title: 'SEÇÃO 2',
        screens: [
        { title: 'Tela 1' },
        { title: 'Tela 2' },
        { title: 'Tela 3' }
        ]
    }

    var sections = {

        items: [section1, section2]
    }

    var categorie = {
        name: 'Texto',
        children: [
        { name: 'Título 1' },
        { name: 'Título 2' }
        ]

    }


    carbo.AAAAAA = body;

    carbo.boxmenuitem = menu;

    carbo.paletteComponents = components;

    carbo.appsections = sections;

    carbo.componentscategories = categorie;

    
    window.addEventListener('WebComponentsReady', function () {
        window.canvas = document.getElementById('canvas');
    });
    

//    window.addEventListener('WebComponentsReady', function () {
//
//        var headerLeftSection = document.getElementById('header-left-section');
//        var headerPanel = document.getElementById('carbo-header-panel');
//        var closeHeaderPanel = document.getElementById('close-header-panel');
//        var windowHeight = window.innerHeight;
//
//        var headerPanelStatus = 'inactive';
//
//        window.addEventListener('resize', function() {
//        console.log('resized')
//        windowHeight = window.innerHeight;
//        closeHeaderPanel.style.height = windowHeight;
//        });
//
//
//
//
//
//
//        headerLeftSection.addEventListener('click', function () {
//
//            if (headerPanelStatus === 'inactive') {
//                headerPanelStatus = 'active';
//                headerPanel.className = 'has-shadow active';
//                closeHeaderPanel.className = 'active';
//                closeHeaderPanel.style.height = windowHeight;
//            } else {
//                headerPanelStatus = 'inactive';
//                headerPanel.className = '';
//                closeHeaderPanel.className = '';
//            }
//
//        });
//
//        closeHeaderPanel.addEventListener('click', function () {
//        headerPanelStatus = 'inactive';
//        headerPanel.className = '';
//        closeHeaderPanel.className = '';
//
//        });
//
//
////        var addScreenButton = document.getElementById('botao-lu');
//        var addScreenButton = document.getElementsByClassName('add-screen-button');
//        var carboSection = document.getElementsByClassName('carbo-section');
//
//        for (var i=0; i < addScreenButton.length; i++) {
//            addScreenButton[i].addEventListener('click', function (event) {
//            alert("foi");
//                console.log(event);
//
////                event.srcElement.parent.
////          carboSection.innerHTML = '<div class="carbo-section-contents">';
//
//          });
//        }
//
//
//    });


})(document);
