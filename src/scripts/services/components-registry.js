// TODO: create mock server based on json-database

var registry = [];

// CARBO-FORM
registry.push({
    title: "Formulário cujo nome é bem grande mesmo",
    context: ['BODY'],
    icon: "assignment",
    html: '<carbo-form id="test"> <form is="iron-form" action="/demo/data.json" method="get"> <paper-input name="test0" label="Campo 1" required error-message="Por favor, preencha esse campo" ></paper-input> <paper-input name="test0" label="Campo 2" required error-message="Campo obrigatório" ></paper-input> </form> <carbo-form-control> <paper-button raised action="reset" >Cancelar</paper-button> <paper-button class="purple" raised action="submit" >Enviar</paper-button> </carbo-form-control> <div state="invalid"> <paper-toast text="Por favor, corrija os campos inválidos" show="show"> </paper-toast> </div><div state="loading"> <div id="formloading"> <paper-spinner alt="Loading form" active></paper-spinner> <p>Carregando</p></div></div><div state="error"> <paper-toast text="Erro de envio" show="show"> <span raised action="click:submit">Tentar novamente</span> </paper-toast> </div><div state="success"> <paper-toast text="Formulário enviado com sucesso!" show="show"> </paper-toast> </div></carbo-form>',

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

// CARBO-SUBMIT-BUTTON
registry.push({
    title: "Botão de submit",
    context: ['CARBO-FORM-CONTROL'],
    icon: "assignment",
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
    context: ['CARBO-FORM-CONTROL'],
    icon: "assignment",
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
    context: ['FORM'],
    icon: "assignment",
    html: '<paper-input name="test0" label="Campo 1" required error-message="Por favor, preencha esse campo" ></paper-input>',
    components: [
        {
            name: 'paper-input',
            repository: 'PolymerElements/paper-input'
        }
    ]
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Botão de menu",
    context: ['PAPER-TOOLBAR'],
    icon: "assignment",
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
    icon: "assignment",
    html: '<div class="title">Title</div>',
});

// PAPER-ICON-BUTTON
registry.push({
    title: "Botão de mais",
    context: ['PAPER-TOOLBAR'],
    icon: "assignment",
    html: '<paper-icon-button icon="more-vert" on-tap="moreAction"></paper-icon-button>',
    components: [
        {
            name: 'paper-icon-button',
            repository: 'PolymerElements/paper-icon-button',
        },
    ],
});

exports.get = function (query) {

    query = query || {};

    var res = _.filter(registry, function (component) {

        var contextFilter = true;

        if (query.context) {
            contextFilter = _.contains(component.context, query.context);
        }

        return contextFilter;
    });

    console.log(res);

    return res;

};