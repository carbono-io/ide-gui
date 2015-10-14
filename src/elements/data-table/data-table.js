'use strict';
// jshint unused:false

var I18N = require('../../scripts/global-behaviors/i18n');

Polymer({
    is: 'carbo-data-table',

    properties: {
        entity: {
            type: Object,
            notify: true,
            observer: '_handleEntityChange',
        },
    },

    behaviors: [
        I18N,
    ],

    listeners: {
        // See
        // https://github.com/GoogleWebComponents/firebase-element/blob/master/firebase-collection.html#L229-L234
        'firebase.firebase-child-added': '_handleFirebaseChildAdded'
    },

    /**
     * Executed whenever child entries are added to firebase collection
     */
    _handleFirebaseChildAdded: function (event) {

        event.stopPropagation();

        var entityItems = this.get('entityItems');
        var lastEntry = _.last(entityItems);

        // TODO: check if entry is a recent entry
        // and only fire the event if so.

        this.fire('data-changed');
    },

    /**
     * Changes the firebase source
     * @param  {[type]} entity    [description]
     * @param  {[type]} oldEntity [description]
     * @return {[type]}           [description]
     */
    _handleEntityChange: function (entity, oldEntity) {
        this.set('entityProperties', entity.properties);
    },

    retrieveFirebaseLocation: function (entity) {
        return entity.location.replace(/\.json$/, '');
    },

    /**
     * Used for computedBinding the value
     * @param  {[type]} entityItem [description]
     * @param  {[type]} property   [description]
     * @return {[type]}            [description]
     */
    readPropertyFromEntityItem: function (entityItem, property) {
        return entityItem[property];
    },

    // TODO: 
    // refatorar para colocar em métodos mais separados
    // e utilizar "inline event listeners"
    // 
    // 
    // o ideal é utilizar "inline" event listener, do estilo
    // <nome-da-tag on-tap="nomeDaFunction"></nome-da-tag>
    // No caso deste componente, o evento iria para a tag div#entity-id
    // 
    // Pat, depois de fazer as correções, por favor remover todos 
    // os comentários que adicionei.
    
    ready: function() {
        var entityId = this.$$('#entity-id');

        var componentContext = this;

        var isClosed = !this.closed;

        if (isClosed) {
            Polymer.Base.toggleClass('closed', false, componentContext.$$('#entity'));
            isClosed = false;
        } else {
            Polymer.Base.toggleClass('closed', true, componentContext.$$('#entity'));
            isClosed = true;
        }

        entityId.addEventListener('click', function(event) {

            if (isClosed) {

                Polymer.Base.toggleClass('closed', false, componentContext.$$('#entity'));
                isClosed = false;
            } else {

                Polymer.Base.toggleClass('closed', true, componentContext.$$('#entity'));
                isClosed = true;
            }
        });
    },

    // TODO: sugestão de separação
    toggleDataTable: function (event) {
        // No caso a variavel element é o elemento clicado
        var element = event.currentTarget;

        // Você deve fazer o toggleClass neste elemento, ao invés de 
        // selecioná-lo através de this.$$ ou componentContext.$$
        console.log(element);

        // Fazer a verificação de open ou closed do elemento aqui
        // e em seguida o toggleClass correspondente
        
        // Após modificar 
    }
});
