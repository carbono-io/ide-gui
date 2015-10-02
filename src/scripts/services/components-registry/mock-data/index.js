'use strict';

// TODO: create mock server based on json-database

var registry = [];

// CARBO-FORM
registry.push(require('./components/carbo-form'));


// CARBO-GALERIA
registry.push({
    title: "Galeria",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false
    },
    html: '<paper-card heading="Actions can be stacked" class="pink"> <div class="card-content"> Lorem ipsum dolor sit amet, nec ad conceptam interpretaris, mea ne solet repudiandae. Laudem nostrud ei vim. Sapientem consequuntur usu ad, vel etiam philosophia ex, ad quidam option quo. Sed sale integre pericula ei, rebum adipiscing ius ea. </div></paper-card> <paper-card heading="Actions can be stacked" class="pink"> <div class="card-content"> Lorem ipsum dolor sit amet, nec ad conceptam interpretaris, mea ne solet repudiandae. Laudem nostrud ei vim. Sapientem consequuntur usu ad, vel etiam philosophia ex, ad quidam option quo. Sed sale integre pericula ei, rebum adipiscing ius ea. </div></paper-card>',
    icon: "view-stream",
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

// CARBO-CAROUSEL
registry.push({
    title: "Carousel",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    html: '<p>carousel de conteúdos</p>',
    icon: "view-carousel",
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

// CARBO-TABELA
registry.push({
    title: "Tabela",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    html: '<p>tabela de conteúdos</p>',
    icon: "view-quilt",
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
    html: '<p>lista de conteúdos</p>',
    icon: "view-headline",
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

// CARBO-GRID
registry.push({
    title: "Grid",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: false,
    },
    html: '<p>grid de conteúdos</p>',
    icon: "view-module",
    components: [
        {
            name: 'paper-card',
            repository: 'PolymerElements/paper-card'
        }
    ]
});

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

// PAPER-INPUT
registry.push({
    title: 'Input de texto',
    context: {
        show: ['FORM', 'CARBO-FORM'],
        insertion: {
            'FORM': false,
            'CARBO-FORM': 'form',
        }
    },
    postInsertion: {
        focus: 'paper-input',
    },
    icon: "text-format",
    html: '<paper-input name="test0" label="Campo 1" required error-message="Por favor, preencha esse campo" ></paper-input>',
    components: [
        {
            name: 'paper-input',
            repository: 'PolymerElements/paper-input'
        }
    ]
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
