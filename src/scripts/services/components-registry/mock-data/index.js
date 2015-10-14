'use strict';

var fs = require('fs');

// TODO: create mock server based on json-database

var registry = [];


// PARAGRAFO
registry.push({
    title: "Parágrafo",
    context: {
        show: ['PAGE', 'BODY', 'FORM'],
        insertion: false
    },
    html: '<p>Insira o conteúdo do seu parágrafo</p>',
    icon: "text-format",
    img: "../../../img/icons/components/paragraph-41.svg",
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
    title: "Título 1",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false
    },
    html: '<h1>Insira o conteúdo do seu título 1</h1>',
    icon: "text-format",
    img: "../../../img/icons/components/title-38.svg",
});


// TÍTULO 2
//registry.push({
//    title: "Título 2",
//    context: {
//        show: ['PAGE', 'BODY'],
//        insertion: false
//    },
//    html: '<h2>Insira o conteúdo do seu título 2</h2>',
//    icon: "text-format",
//    img: "../../../img/icons/components/list-21.svg",
//});


// CARBO-FORM
registry.push(require('./components/carbo-form'));

// PAPER-INPUT
registry.push(require('./components/paper-input'));


// CARBO-GALERIA
//registry.push({
//    title: "Galeria",
//    context: {
//        show: ['PAGE', 'BODY'],
//        insertion: false
//    },
//    html: '<div><paper-card heading="Conteúdo 1" class="pink"> <div class="card-content"> Conteúdo do item 1 </div></paper-card> <paper-card heading="Conteúdo 2" class="pink"> <div class="card-content"> Conteúdo do item 2 </div></paper-card></div>',
////    icon: "view-stream",
//    icon: "view-module",
//    img: "../../../img/icons/components/list-21.svg",
//    components: [
//        {
//            name: 'paper-card',
//            repository: 'PolymerElements/paper-card'
//        }
//    ]
//});


// CARBO-CAROUSEL
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
    title: "Tabela",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    html: '<table> <tr> <th>Campo 1</th> <th>Campo 2</th> </tr> <tr> <td>Conteúdo 1</td> <td>Conteúdo 2</td> </tr> <tr> <td>Conteúdo 1</td> <td>Conteúdo 2</td> </tr><tr>    <td>Conteúdo 1</td> <td>Conteúdo 2</td> </tr></table>',
//    icon: "view-quilt",
    icon: "view-module",
    img: "../../../img/icons/components/table-29.svg",
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

// CARBO-LISTA
registry.push({
    title: "Lista",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    html: '<ul> <li>Conteúdo 1</li> <li>Conteúdo 2</li> <li>Conteúdo 3</li> </ul>',
//    icon: "view-headline",
    icon: "view-module",
    img: "../../../img/icons/components/list-21.svg",
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

// CARBO-GRID
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
    title: "Botão de submit",
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
    icon: "image:crop-7-5",
    img: "../../../img/icons/components/list-21.svg",
    html: '<paper-button class="purple" raised action="submit" >Enviar</paper-button>',
    components: [
        {
            name: 'paper-button',
            repository: 'PolymerElements/paper-button',
        },
    ],
});

// CARBO-CANCEL-BUTTON
registry.push({
    title: "Botão de cancelar",
    context: {
        show: ['CARBO-FORM-CONTROL', 'CARBO-FORM'],
        insertion: {
            'CARBO-FORM-CONTROL': false,
            'CARBO-FORM': 'carbo-form-control',
        }
    },
    icon: "image:crop-7-5",
    html: '<paper-button class="red" raised action="submit" >Cancelar</paper-button>',
    components: [
        {
            name: 'paper-button',
            repository: 'PolymerElements/paper-button',
        },
    ],
});

// CARBO-GEO
registry.push({
    title: "Input de localização",
    context: {
        show: ['FORM', 'CARBO-FORM'],
        insertion: {
            'FORM': false,
            'CARBO-FORM': 'form',
        }
    },
    html: '<carbo-geo-test></carbo-geo-test>',
    icon: 'communication:location-on',
    img: "../../../img/icons/components/list-21.svg",
    components: [
        {
            name: 'carbo-geo',
            repository: 'https://github.com/simonfan/carbo-geo.git',
        }
    ]
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Botão de menu",
    context: {
        show: ['PAPER-TOOLBAR'],
        insertion: {
            'PAPER-TOOLBAR': false
        },
    },
    icon: "menu",
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
    title: "Título",
    context: {
        show: ['PAPER-TOOLBAR'],
        insertion: {
            'PAPER-TOOLBAR': false
        },
    },
    icon: "text-format",
    html: '<div class="title">Title</div>',
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Botão de opções",
    context: {
        show: ['PAPER-TOOLBAR'],
        insertion: {
            'PAPER-TOOLBAR': false
        },
    },
    icon: "more-vert",
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
