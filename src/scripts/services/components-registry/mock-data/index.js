'use strict';

var fs = require('fs');

// TODO: create mock server based on json-database

var registry = [];


// PARAGRAFO
registry.push({
    title: "Parágrafo",
    tag: "<carbo-p>",
    description: "A paragraph consists of one or more sentences. Can be dynamic or static.",
    context: {
        show: ['PAGE', 'BODY', 'FORM'],
        insertion: false
    },
    preview:'',
    html: '<p>Please insert <p> content</p>',
    icon: "component-48:outputparagraph",
    i18n: {
        en: {
            title: 'Paragraph',
            description: "A paragraph consists of one or more sentences. Can be dynamic or static."

        },
        pt: {
            title: 'Parágrafo',
            description:"Parágrafo de texto dinâmico ou estático, contém uma ou mais linhas."

        }
    }
});

// Texto
//registry.push({
//    title: "Texto",
//    context: {
//        show: ['PAGE', 'BODY', 'FORM'],
//        insertion: false
//    },
//    html: '<p>Insira o conteúdo do seu parágrafo</p>',
//    icon: "text-format",
//    img: "../../../img/icons/components/list-21.svg",
//});

// TÍTULO 1
registry.push({
    title: "Título principal",
    tag: "<carbo-h1>",
    description: "Html h1 title.",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false
    },
    preview:'',
    html: '<h1>Please insert title</h1>',
    icon: "component-48:outputtitle",
    i18n: {
        en: {
            title: 'Title',
            description: "Html h1 title."

        },
        pt: {
            title: 'Título',
            description: "Título de maior nível hierárquico da aplicação."

        }
    }
});

//
//// TÍTULO 2
//registry.push({
//    title: "Título 2",
//    context: {
//        show: ['PAGE', 'BODY'],
//        insertion: false
//    },
//    html: '<h2>Insira o conteúdo do seu título 2</h2>',
//    icon: "component-48:outputtitle2",
//});


// CARBO-FORM
registry.push(require('./components/carbo-form'));

// PAPER-INPUT
registry.push(require('./components/paper-input'));


//// CARBO-GALERY
//registry.push({
//    title: "Lista",
//    context: {
//        show: ['PAGE', 'BODY'],
//        insertion: false
//    },
//    html: '<div><paper-card heading="Conteúdo 1" class="pink"> <div class="card-content"> Conteúdo do item 1 </div></paper-card> <paper-card heading="Conteúdo 2" class="pink"> <div class="card-content"> Conteúdo do item 2 </div></paper-card></div>',
////    icon: "view-stream",
//    icon: "component-48:galery",
//    components: [
//        {
//            name: 'paper-card',
//            repository: 'PolymerElements/paper-card'
//        }
//    ]
//});


//// CARBO-CAROUSEL
//registry.push({
//    title: "Carousel",
//    context: {
//        show: ['PAGE', 'BODY'],
//        insertion: false,
//    },
//    html: '<paper-card heading="Carousel" class="pink"> <div class="card-content"> Lorem ipsum dolor sit amet, nec ad conceptam interpretaris, mea ne solet repudiandae. Laudem nostrud ei vim. Sapientem consequuntur usu ad, vel etiam philosophia ex, ad quidam option quo. Sed sale integre pericula ei, rebum adipiscing ius ea. </div></paper-card> <paper-card heading="Actions can be stacked" class="pink"> <div class="card-content"> Lorem ipsum dolor sit amet, nec ad conceptam interpretaris, mea ne solet repudiandae. Laudem nostrud ei vim. Sapientem consequuntur usu ad, vel etiam philosophia ex, ad quidam option quo. Sed sale integre pericula ei, rebum adipiscing ius ea. </div></paper-card>',
////    icon: "view-carousel",
//    icon: "view-module",
//    img: "../../../img/icons/components/list-21.svg",
//    components: [
//        {
//            name: 'paper-card',
//            repository: 'PolymerElements/paper-card'
//        }
//    ]
//});

// CARBO-TABELA
registry.push({
    title: "Table",
    tag: "<carbo-table>",
    description: "A list of elements semanticaly grouped. Can be dynamic or static.",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    preview:'',

    html: '<table> <tr> <th>Field 1</th> <th>Field 2</th> </tr> <tr> <td>Content 1</td> <td>Content 2</td> </tr> <tr> <td>Content 1</td> <td>Content 2</td> </tr><tr>    <td>Content 1</td> <td>Content 2</td> </tr></table>',
//    icon: "view-quilt",
    icon: "component-48:table",
    i18n: {
        en: {
            title: 'Table',
            description: "A list of elements semanticaly grouped. Can be dynamic or static."

        },
        pt: {
            title: 'Tabela',
            description: "Listagem de elementos de mesma natureza, que podem ser dinâmicos ou estáticos."

        }
    },
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

// CARBO-LISTA
registry.push({
    title: "List",
    tag: "<carbo-list>",
    description: "A list of elements from the same nature. Can be dynamic or static.",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    preview:'',
    html: '<ul> <li>Content 1</li> <li>Content 2</li> <li>Content 3</li> </ul>',
//    icon: "view-headline",
    icon: "component-48:list",
    i18n: {
        en: {
            title: 'Table',
            description: "A list of elements from the same nature. Can be dynamic or static."

        },
        pt: {
            title: 'Tabela',
            description: "Listagem de elementos de mesma natureza, que podem ser dinâmicos ou estáticos."

        }
    },
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

//// CARBO-GRID
//registry.push({
//    title: "Grid",
//    context: {
//        show: ['PAGE', 'BODY'],
//        insertion: false,
//    },
//    html: '<table class="grid"> <tr> <td>Conteúdo 1</td> <td>Conteúdo 2</td> <td>Conteúdo 3</tr> <tr> <td> Conteúdo 4</td> <td>Conteúdo 5</td> <td>Conteúdo 6</td> </tr></table>',
//    icon: "view-module",
//    img: "../../../img/icons/components/list-21.svg",
//    components: [
//        {
//            name: 'paper-card',
//            repository: 'PolymerElements/paper-card'
//        }
//    ]
//});

// CARBO-SUBMIT-BUTTON
registry.push({
    title: "Submit Button",
    context: {
        show: ['CARBO-FORM-CONTROL', 'CARBO-FORM'],
        insertion: {
            'CARBO-FORM-CONTROL': false,
            'CARBO-FORM': 'carbo-form-control',
        }
    },
    postInsertion: {
        focus: 'paper-button',
    },
    
    preview:'',
    icon: "component-48:buttonsubmit",
    i18n: {
        en: {
            title: 'Submit Button',
            description: "A button that submits the form it is inserted to the server."

        },
        pt: {
            title: 'Botão Enviar',
            description: "Botão que envia dados de um formulário ao servidor."

        }
    },
    html: '<paper-button class="purple" raised action="submit" >Submit</paper-button>',
    components: [
        {
            name: 'paper-button',
            repository: 'PolymerElements/paper-button',
        },
    ],
});

// CARBO-CANCEL-BUTTON
registry.push({
    title: "Cancel Button",
    context: {
        show: ['CARBO-FORM-CONTROL', 'CARBO-FORM'],
        insertion: {
            'CARBO-FORM-CONTROL': false,
            'CARBO-FORM': 'carbo-form-control',
        }
    },
    
    preview:'',
    icon: "component-48:buttoncancel",
    i18n: {
        en: {
            title: 'Cancel Button',
            description: "A button that cancels the form it is inserted into."

        },
        pt: {
            title: 'Botão Cancelar',
            description: "Botão que cancela o envio de dados."

        }
    },
    html: '<paper-button class="red" raised action="submit" >Cancel</paper-button>',
    components: [
        {
            name: 'paper-button',
            repository: 'PolymerElements/paper-button',
        },
    ],
});

// CARBO-GEO
registry.push({
    title: "Geolocalization Input",
    context: {
        show: ['FORM', 'CARBO-FORM'],
        insertion: {
            'FORM': false,
            'CARBO-FORM': 'form',
        }
    },
    preview:'',
    
    html: '<carbo-geo-test></carbo-geo-test>',
    i18n: {
        en: {
            title: 'Geolocalization Input',
            description: "Retrieves geolocalization data."

        },
        pt: {
            title: 'Geolocalização',
            description: ""

        }
    },
    icon: "component-48:inputgps",
    components: [
        {
            name: 'carbo-geo',
            repository: 'https://github.com/simonfan/carbo-geo.git',
        }
    ]
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Menu Button",
    context: {
        show: ['PAPER-TOOLBAR'],
        insertion: {
            'PAPER-TOOLBAR': false
        },
    },
    
    preview:'',
    icon: "component-48:sidemenu",
    i18n: {
        en: {
            title: 'Menu Button',
            description: "A button that drops a menu."

        },
        pt: {
            title: 'Botão Menu',
            description: "Botão que exibe menu."

        }
    },
    html: '<paper-icon-button icon="menu" on-tap="menuAction"></paper-icon-button>',
    components: [
        {
            name: 'paper-icon-button',
            repository: 'PolymerElements/paper-icon-button',
        },
    ],
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Page Title",
    context: {
        show: ['PAPER-TOOLBAR'],
        insertion: {
            'PAPER-TOOLBAR': false
        },
    },
    
    preview:'',
    i18n: {
        en: {
            title: 'Page Title',
            description: "Sets the page title."

        },
        pt: {
            title: 'Títula da página',
            description: "Coloca um títula na tela.."

        }
    },
    icon: "text-format",
    html: '<div class="title">{{pageTitle}}</div>',
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Options Button",
    context: {
        show: ['PAPER-TOOLBAR'],
        insertion: {
            'PAPER-TOOLBAR': false
        },
    },
    
    preview:'',
    icon: "component-48:moreoptions",
    i18n: {
        en: {
            title: 'Options Button',
            description: "A button that slides a side menu."

        },
        pt: {
            title: 'Botão Opções',
            description: "Botão que mostra um menu lateral."

        }
    },
    html: '<paper-icon-button icon="more-vert" on-tap="moreAction"></paper-icon-button>',
    components: [
        {
            name: 'paper-icon-button',
            repository: 'PolymerElements/paper-icon-button',
        },
    ],
});

// Export registry
module.exports = registry;
