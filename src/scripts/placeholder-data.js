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

    var verde = {
        name: 'Verde',
        icon: 'verde'
    };

    var cinza = {
        name: 'Cinza',
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
                    name: "Fundo azul",
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
            title: "Formulário cujo nome é bem grande mesmo",
            icon: "assignment",
            screens: [
                {
                    url: "https://placehold.it/200x500",
                    screensCaption: "tela1"
                }
            ],

            html: '<carbo-form id="test"> <form is="iron-form" action="/demo/data.json" method="get"> <paper-input name="test0" label="Campo 1" required error-message="Por favor, preencha esse campo" ></paper-input> <paper-input name="test0" label="Campo 2" required error-message="Campo obrigatório" ></paper-input> </form> <div form-control> <div class="form-commands"> <paper-button raised action="reset" >Cancelar</paper-button> <paper-button class="purple" raised action="submit" >Enviar</paper-button> </div></div><div state="invalid"> <paper-toast text="Por favor, corrija os campos inválidos" show="show"> </paper-toast> </div><div state="loading"> <div id="formloading"> <paper-spinner alt="Loading form" active></paper-spinner> <p>Carregando</p></div></div><div state="error"> <paper-toast text="Erro de envio" show="show"> <span raised action="click:submit">Tentar novamente</span> </paper-toast> </div><div state="success"> <paper-toast text="Formulário enviado com sucesso!" show="show"> </paper-toast> </div></carbo-form>',

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

    ];

    var section1 = {
        title: 'SEÇÃO 1',
        screens: [
            { title: 'Tela 1' },
            // { title: 'Tela 2' }
        ]
    };

    var section2 = {
        title: 'SEÇÃO 2',
        screens: [
            { title: 'Tela 1' },
            { title: 'Tela 2' },
            { title: 'Tela 3' }
        ]
    };

    var sections = {

        items: [
            section1,
            // section2
        ]
    };

    var categorie = {
        name: 'Texto',
        children: [
            { name: 'Título 1' },
            { name: 'Título 2' }
        ]

    };

    var item1 = {

        properties: [
            { content: 'bla 1' },
            { content: 'bla 2' },
    //        { content: 'bla 3' },
    //        { content: 'bla 4' },
    //        { content: 'bla 5' },
        ]
    };

    var item2 = {

        properties: [
            { content: 'bla 1' },
            { content: 'bla 2' },
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
            { name: 'Campo 1' },
            { name: 'Campo 2' },
            // { name: 'Campo 3' },
            // { name: 'Campo 4' },
            // { name: 'Campo 5' }
        ],

        items: [item3],

    };

    carbo.activePage = body;

    carbo.styleGroups = group;

    carbo.boxmenuitem = menu;

    // carbo.paletteComponents = components;

    carbo.appsections = sections;

    //carbo.data = entity1;

    carbo.entitydata = entity1;

    carbo.componentscategories = categorie;

};