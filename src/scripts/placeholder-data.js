'use strict';

/**
 * This file holds all placeholder data used for test purposes.
 */

/**
 * Export a function that receives carbo as the only argument.
 * The reference to carbo will be used to set data onto the main scope
 * of the application.
 */
module.exports = function (carbo) {

    // Pseudo components
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
        name: 'Tela 1',
        children: [
            header,
            // content,
            // footer
        ]
    };

    var menuComponentsTree = {
        items: [
            { icon: 'add', title: 'add screen' },
        ]
    };

    var menuSettings = {
        items: [
            { icon: 'code', title: 'toggle code' },
        ]
    };

    var menuStyle = {
        items: [
            { icon: 'code', title: 'toggle code' },
        ]
    };

    var verde = {
        name: 'Green',
        icon: 'verde'
    };

    var cinza = {
        name: 'Gray',
        icon: 'cinza'
    };

    //var group = {
    //    name: 'Background',
    //    items: [verde, cinza],
    //};

    var group = [
        {
            title: "Header",
            styles: [
                {
                    name: "Gray background",
                    icon: "cinza"
                },
                // {
                //     name: "Branco",
                //     icon: "branco"
                // },
            ],
        },
        //    {
        //    title: "Botões",
        //     styles: [
        //         {
        //             name: "Cancelar",
        //             icon: "btn1"
        //         },
        //         {
        //             name: "Enviar",
        //             icon: "btn2"
        //         },
        //     ],
        // },
    ];

    var components = [
        {
            title: "Big form name",
            icon: "assignment",
            screens: [
                {
                    url: "https://placehold.it/200x500",
                    screensCaption: "screen1"
                }
            ],

            html: '<carbo-form id="test"> <form is="iron-form" action="/demo/data.json" method="get"> <paper-input name="test0" label="Field 1" required error-message="Required field" ></paper-input> <paper-input name="test0" label="Field 2" required error-message="Required field" ></paper-input> </form> <div form-control> <div class="form-commands"> <paper-button raised action="reset" >Cancel</paper-button> <paper-button class="purple" raised action="submit" >Submit</paper-button> </div></div><div state="invalid"> <paper-toast text="Invalid fields" show="show"> </paper-toast> </div><div state="loading"> <div id="formloading"> <paper-spinner alt="Loading form" active></paper-spinner> <p>Carregando</p></div></div><div state="error"> <paper-toast text="Error trying to send, please try again." show="show"> <span raised action="click:submit">Please try againd</span> </paper-toast> </div><div state="success"> <paper-toast text="Done!" show="show"> </paper-toast> </div></carbo-form>',

            // Compliant with code machine API
            // html: [
            //     '<carbo-form>',
            //         '<form is="iron-form">',
            //             '<paper-input name="campo-1" label="Campo-1"></paper-input>',
            //             '<paper-input name="campo-2" label="Campo-2"></paper-input>',
            //         '</form>',
            //     '</carbo-form>'
            // ].join(''),

            components: [
                {
                    name: 'carbo-form',
                    repository: 'https://github.com/carbono-io/carbo-form.git',
                },
                {
                    name: 'iron-form',
                    repository: 'PolymerElements/iron-form',
                },
                {
                    name: 'paper-input',
                    repository: 'PolymerElements/paper-input',
                },
                {
                    name: 'paper-toast',
                    repository: 'PolymerElements/paper-toast',
                },
                {
                    name: 'paper-button',
                    repository: 'PolymerElements/paper-button',
                },
            ],
        },
        {
            title: "Gallery",
            icon: "view-agenda",
            screens: [
                {
                    url: "https://bttgeraes.files.wordpress.com/2006/08/paisage-perdidos.jpg",
                    screensCaption: "screen1"
                },
                {
                    url: "https://images.tcdn.com.br/img/img_prod/210907/havaianas_slim_paisage_fever_1324_1_20140724125126.jpg",
                    screensCaption: "screen2"
                },

            ],
        },
        {
            title: "Chart 1",
            icon: "editor:insert-chart",
            screens: [
                {
                    url: "http://artistsinspireartists.com/wp-content/uploads/2011/04/Dance-Photography-14.png",
                    screensCaption: "screen1"
                },
                {
                    url: "http://wikidanca.net/wiki/images/7/7d/Grupo_corpo.jpg",
                    screensCaption: "screen2"
                },

            ],
        },
        {
            title: "Chart 2",
            icon: "editor:insert-chart",
            screens: [
                {
                    url: "http://artistsinspireartists.com/wp-content/uploads/2011/04/Dance-Photography-14.png",
                    screensCaption: "screen1"
                },
            ],
        },

    ];

    var section1 = {
        title: 'SECTION 1',
        screens: [
            { title: 'Screen 1' },
            // { title: 'Tela 2' }
        ]
    };

    var section2 = {
        title: 'SECTION 2',
        screens: [
            { title: 'Screen 1' },
            { title: 'Screen 2' },
            { title: 'Screen 3' }
        ]
    };

    var sections = {

        items: [
            section1,
            // section2
        ]
    };

    var categorie = {
        name: 'Text',
        children: [
            { name: 'Title 1' },
            { name: 'Title 2' }
        ]

    };

    var item1 = {

        properties: [
            { content: 'example 1' },
            { content: 'example 2' },
    //        { content: 'bla 3' },
    //        { content: 'bla 4' },
    //        { content: 'bla 5' },
        ]
    };

    var item2 = {

        properties: [
            { content: 'example 1' },
            { content: 'example 2' },
        ]
    };

    var item3 = {

        properties: [
            { content: '' },
            { content: '' },
        ]
    };

    var entity1 = {

        properties: [
            { name: 'Text-input 1', type: 'text'},
            { name: 'Text-input 2', type: 'text' },
            // { name: 'Campo 3' },
            // { name: 'Campo 4' },
            // { name: 'Campo 5' }
        ],

        items: [item3],

    };

    carbo.activePage = body;

    carbo.styleGroups = group;

    carbo.boxmenuitemComponents = menuComponentsTree;

    carbo.boxmenuitemSettings = menuSettings;

    carbo.boxmenuitemStyle = menuStyle;

    // carbo.paletteComponents = components;

    carbo.appsections = sections;

    //carbo.data = entity1;

    carbo.entitydata = entity1;

    carbo.componentscategories = categorie;

};
