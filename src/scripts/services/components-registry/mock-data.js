'use strict';

// TODO: create mock server based on json-database

var registry = [];

// CARBO-FORM
registry.push({
    title: "Formulário",
    context: {
        show: ['PAGE', 'BODY'],
        insertion: ''
    },
    // select the carbo-form after the component is inserted
    postInsertion: {
        focus: 'carbo-form',
    },
    icon: "assignment",
    html: '<carbo-form id="test"> <form is="iron-form" action="/demo/data.json" method="get"> <paper-input name="test0" label="Campo 1" required error-message="Por favor, preencha esse campo" ></paper-input> <paper-input name="test0" label="Campo 2" required error-message="Campo obrigatório" ></paper-input> </form> <carbo-form-control> <paper-button class="purple" raised action="submit" >Enviar</paper-button> </carbo-form-control> <div state="invalid"> <paper-toast text="Por favor, corrija os campos inválidos" show="show"> </paper-toast> </div><div state="loading"> <div id="formloading"> <paper-spinner alt="Loading form" active></paper-spinner> <p>Carregando</p></div></div><div state="error"> <paper-toast text="Erro de envio" show="show"> <span raised action="click:submit">Tentar novamente</span> </paper-toast> </div><div state="success"> <paper-toast text="Formulário enviado com sucesso!" show="show"> </paper-toast> </div></carbo-form>',

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
});


// CARBO-GALERIA
registry.push({
    title: "Galeria",
    context: ['PAGE', 'BODY'],
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
    context: ['PAGE', 'BODY'],
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
    context: ['PAGE', 'BODY'],
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
    context: ['PAGE', 'BODY'],
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
    context: ['PAGE', 'BODY'],
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
            'CARBO-FORM-CONTROL': '',
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
            'CARBO-FORM-CONTROL': '',
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
            'FORM': '',
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
            'FORM': '',
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
    context: ['PAPER-TOOLBAR'],
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
    context: ['PAPER-TOOLBAR'],
    icon: "text-format",
    html: '<div class="title">Title</div>',
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Botão de opções",
    context: ['PAPER-TOOLBAR'],
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
