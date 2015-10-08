'use strict';
// jshint unused:false

/* globals _, Q */

var OPTIONS_BY_PROPERTIES = {
  "border-style":[
    "none",
    "hidden",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
    "initial",
    "inherit"
  ],
  "border-width":[
    "medium",
    "thin",
    "thick",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em"
  ],
  "text-indent":[
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%",
  ],
  "text-transform":[
    "none",
    "capitalize",
    "uppercase",
    "lowercase",
    "initial",
    "inherit"
  ],
  "line-height":[
    "normal",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "vertical-align":[
    "baseline",
    "sub",
    "super",
    "top",
    "text-top",
    "middle",
    "bottom",
    "text-bottom",
    "initial",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "letter-spacing":[
      "normal",
      "initial",
      "inherit",
      "px",
      "pt",
      "cm",
      "em"
  ],
  "word-spacing":[
    "normal",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em"
  ],
  "white-space":[
    "normal",
    "nowrap",
    "pre",
    "pre-line",
    "pre-wrap",
    "initial",
    "inherit"
  ],
  "direction":[
    "ltr",
    "rtl",
    "initial",
    "inherit"
  ],
  "font-family":[
    "initial",
    "inherit",
    "--",
    "---"
  ],
  "font-style":[
    "normal",
    "italic",
    "oblique",
    "initial",
    "inherit"
  ],
  "font-variant":[
    "normal",
    "small-caps",
    "initial",
    "inherit"
  ],
  "font-weight":[
    "normal",
    "bold",
    "bolder",
    "lighter",
    "initial",
    "inherit",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
  "font-size":[
    "medium",
    "xx-small",
    "x-small",
    "small",
    "large",
    "x-large",
    "xx-large",
    "smaller",
    "larger",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "margin":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "margin-bottom":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "margin-left":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "margin-right":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "margin-top":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "padding":[
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "padding-left":[
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "padding-top":[
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "padding-bottom":[
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "padding-right":[
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "width": [
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "min-width": [
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "max-width": [
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "height": [
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "max-height": [
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "min-height": [
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "%"
  ],
  "display":[
    "inline",
    "block",
    "flex",
    "inline-block",
    "inline-flex",
    "inline-table",
    "list-item",
    "run-in",
    "table",
    "table-caption",
    "table-column-group",
    "table-header-group",
    "table-footer-group",
    "table-row-group",
    "table-cell",
    "table-column",
    "table-row",
    "none",
    "initial",
    "inherit"
  ],
  "position":[
    "static",
    "absolute",
    "fixed",
    "relative",
    "initial",
    "inherit"
  ],
  "top":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "botton":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "left":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "right":[
    "auto",
    "initial",
    "inherit",
    "px",
    "pt",
    "cm",
    "em",
    "%"
  ],
  "float":[
    "none",
    "left",
    "right",
    "initial",
    "inherit"
  ],
  "clear":[
    "none",
    "left",
    "right",
    "both",
    "initial",
    "inherit"
  ],
  "z-index":[
      "none",
      "initial",
      "inherit",
      "insert value"
  ],
  "overflow":[
    "visible",
    "hidden",
    "scroll",
    "auto",
    "initial",
    "inherit"
  ]
};

//nao unitario sao unidades os outros valores
var NOT_FIXED_OPTIONS = [
  "px",
  "pt",
  "cm",
  "%",
  "em",
  "rem",
  "vh",
  "vw"
];

Polymer({
    is: 'carbo-input-unit',
    properties: {
      value: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
      property:{
        type: String,
        notify: true
      },
      number: {
          type: Number,
          notify: true,
          observer: '_handleNumberChange',
      },
      unit: {
          type: String,
          notify: true,
          observer: '_handleUnitChange',
      },
      options :{
        type:Array
      }
    },


    ready:function(){

      var select = this.$["input-unit"].children[1];

      this._makeList();

      var matchRes = this.get('value').match(/(\d+)(.*$)/);
      if(matchRes){
        console.log(matchRes);
        this.set( "number" , matchRes[1]);
        this.set( "unit" , matchRes[2]);
        select.value = matchRes[2];
      }

    },

    listeners: {
      'selector.change': '_selectorChanged'
    },

    //altera o valor do unit ao mudar o selector
    _selectorChanged:function(e){
        this.set("unit" , e.path[0].value);
    },

    _calculateFinalValue: function(){
      var finalValue = this.get("number")+this.get("unit");
      if(!_.includes(NOT_FIXED_OPTIONS, this.get("unit"))) finalValue = this.get("unit");
      this.set("value" , finalValue);
      this.fire('change');
    },

    _makeList:function(){
      var select =  this.$["input-unit"].children[1];
      var options = OPTIONS_BY_PROPERTIES[this.get("property")];
      if(options){
        options.forEach(function (item) {
            var option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            select.appendChild(option);
        });
      }
    },

    _handleNumberChange:function(val){
        this._calculateFinalValue();
    },

    _handleUnitChange:function(){

      var input = this.$["input-unit"].children[0];
      var select = this.$["input-unit"].children[1];

      select.value = this.get("unit");

      if(!_.includes(NOT_FIXED_OPTIONS, this.get("unit"))){
        input.setAttribute("disabled", "disabled");
        select.setAttribute("class", "full");
      }
      else{
        input.removeAttribute("disabled");
        input.focus();
        select.removeAttribute("class");
      }

      this._calculateFinalValue();

    }



});
