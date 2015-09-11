# bower install com conflito de versões
Acho que a solução vai pelo caminho de `bower.install(libs, { forceLatest: true })`
Dei uma testada aqui e ele funcionou. Claramente não é a solução definitiva, mas, concordo 
bastante com o que você disse de que temos controle sobre as versões no MVP (os componentes
são em essência nossos, podemos dar lock de versão em todo mundo tranquilamente)

# path para o index.html do projeto editado
Opções:
- mudar para 'src/index.html'
- estar em uma config
- buscar entre todos os arquivos do projeto e encontrar o arquivo que tenha `<head>`

# inserção de componentes e imports

Path de instalação: o bower segue utilizando a path `src/bower_components` mesmo depois de ter mudado o .bowerrc para { directory: "bower_components" }

## inserção de componente `iron-form`

Está perfeito.

## inserção de componente `carbo-form`

O link inserido para o carbo-form está como 'undefined'
<link rel="import" href="undefined">

E inspecionei a pasta bower_components e pelo jeito o componente também não foi colocado na pasta, o que é muito estranho. 

Vou estudar o repo do componente carbo-form e ver se não tem nenhum erro no bower.json dele.
Dei uma olhada por cima e parece tudo ok, idêntico ao `iron-form`. 

## inserção de componente `paper-input`
O insertImports está inserindo um link estranho:
```
<link rel="import" href="src/bower_components/paper-input/paper-input.html,src/bower_components/paper-input/paper-textarea.html,src/bower_components/paper-input/paper-input-behavior.html,src/bower_components/paper-input/paper-input-container.html,src/bower_components/paper-input/paper-input-error.html,src/bower_components/paper-input/paper-input-char-counter.html">
```

Segue o bower.json do `paper-input`
```
{
  "name": "paper-input",
  "version": "1.0.11",
  "description": "Material design text fields",
  "authors": [
    "The Polymer Authors"
  ],
  "keywords": [
    "web-components",
    "polymer",
    "input"
  ],
  "main": [
    "paper-input.html",
    "paper-textarea.html",
    "paper-input-behavior.html",
    "paper-input-container.html",
    "paper-input-error.html",
    "paper-input-char-counter.html"
  ],
  "private": true,
  "repository": {
    "type": "git",
    "url": "git://github.com/PolymerElements/paper-input.git"
  },
  "license": "http://polymer.github.io/LICENSE.txt",
  "homepage": "https://github.com/PolymerElements/paper-input",
  "ignore": [],
  "dependencies": {
    "polymer": "Polymer/polymer#^1.0.0",
    "iron-autogrow-textarea": "PolymerElements/iron-autogrow-textarea#^1.0.0",
    "iron-behaviors": "PolymerElements/iron-behaviors#^1.0.0",
    "iron-form-element-behavior": "PolymerElements/iron-form-element-behavior#^1.0.0",
    "iron-input": "PolymerElements/iron-input#^1.0.0",
    "paper-styles": "PolymerElements/paper-styles#^1.0.0"
  },
  "devDependencies": {
    "iron-component-page": "PolymerElements/iron-component-page#^1.0.0",
    "iron-test-helpers": "PolymerElements/iron-test-helpers#^1.0.0",
    "iron-validator-behavior": "PolymerElements/iron-validator-behavior#^1.0.0",
    "test-fixture": "PolymerElements/test-fixture#^1.0.0",
    "web-component-tester": "*",
    "webcomponentsjs": "webcomponents/webcomponentsjs#^0.7.0",
    "iron-icon": "PolymerElements/iron-icon#^1.0.0",
    "paper-icon-button": "PolymerElements/paper-icon-button#^1.0.0"
  }
}
```