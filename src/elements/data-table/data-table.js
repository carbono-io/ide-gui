// jshint unused:false
(function () {

    Polymer({
        is: 'carbo-data-table',

        // TODO: 
        // refatorar para colocar em métodos mais separados
        // e utilizar "inline event listeners"
        // 
        // Este erro é culpa minha Pat. 
        // A primeira implementação que a gente fez,
        // do componente de components-tree, mas aquele foi um dos
        // primeiros componentes que nós implementamos.
        // 
        // Mas com o passar do tempo, aprendi maneiras melhores de fazer,
        // 
        // o ideal é utilizar "inline" event listener, do estilo
        // <nome-da-tag on-tap="nomeDaFunction"></nome-da-tag>
        // No caso deste componente, o evento iria para a tag div#entity-id
        // 
        // Pat, depois de fazer as correções, por favor remover todos 
        // os comentários que adicionei.
        ready: function() {
            var entityId = this.$$('#entity-id');
            console.log(entityId);
            var componentContext = this;

            var isClosed = !this.closed;

            if (isClosed) {
                console.log('open');
                Polymer.Base.toggleClass('closed', false, componentContext.$$('#entity'));
                isClosed = false;
            } else {
                console.log('close');
                Polymer.Base.toggleClass('closed', true, componentContext.$$('#entity'));
                isClosed = true;
            }

            entityId.addEventListener('click', function(event) {

                if (isClosed) {
                    console.log('open');
                    Polymer.Base.toggleClass('closed', false, componentContext.$$('#entity'));
                    isClosed = false;
                } else {
                    console.log('close');
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

})();
