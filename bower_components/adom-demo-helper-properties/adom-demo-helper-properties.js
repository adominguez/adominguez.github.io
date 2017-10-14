(function () {
  'use strict';

  Polymer({

    is: 'adom-demo-helper-properties',

    properties: {
      /**
       * Component name, is a obligatory property
       */
      componentName: {
        type: String,
        observer: '_setHeading'
      },
      _file: {
        type: String,
        observer: '_setFile'
      },
      _fileHtml: {
        type: String,
        observer: '_setFileHtml'
      },
      _scss: {
        type: String,
        observer: '_setScss'
      },
      _mixins: {
        type: Array,
        value: function () {
          return [];
        }
      },
      _slot: {
        type: String,
        observer: '_setSlot'
      },
      slot: {
        type: String
      },
      slotted: {
        type: String
      },
      /**
       * set the events fired
       */
      toastEvents: {
        type: Array,
        value: function () {
          return [];
        },
        notify: true,
      },
      allowSlot: {
        type: Boolean,
        value: false
      },
      /**
       * component properties setted
       */
      propertiesSetted: {
        type: Array,
        value: function () {
          return [];
        },
        notify: true
      },
      _propertiesBinded: {
        type: Array,
        value: function () {
          return [];
        },
        notify: true,
        observer: '_setProperties'
      },
      methods: {
        type: Array,
        value: function () {
          return [];
        }
      },
      dataUrl: {
        type: String,
        value: null
      },
      data: {
        type: Array,
        value: function () {
          return [];
        }
      },
      propertyBindedData: {
        type: String,
        value: null
      },
      /**
       * selected in paper-tabs
       */
      selected: {
        type: Number,
        value: 0,
        notify: true,
        reflectToAttribute: true
      }
    },

    ready: function () {
      for (var i = 0; i < this.toastEvents.length; i++) {
        this.addEventListener(this.toastEvents[i], function (e) {
          this._showToast(e);
          if(e.detail !== null) {
            this.$.toastContent.innerHTML=e.detail
          }
        })
      }
    },

    _setHeading: function (componentName) {
      this.$$('#heading').innerHTML = this.children[0].getAttribute('data-heading');
      this.$$('#description').innerHTML = this.children[0].getAttribute('data-description');
      this._file = '../bower_components/' + componentName + '/' + componentName + '-styles.html';
      this._fileHtml = '../bower_components/' + componentName + '/' + componentName + '.html';
    },

    _setFile: function() {
      var self = this;
      /**
       * Call for get the scss file of component
       */
      var request = new XMLHttpRequest();
      request.open('GET', self._file, true);
      var secondFile = '../' + self.componentName + '-styles.html';
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Save the scss in a property
          self._scss = request.responseText;
        }
        else if (self._file !== secondFile) {
          self._file = secondFile;
          self._setFile();
        }
        else {
          self._propertiesBinded = self.propertiesSetted;
          console.error('file not found');
        }
      };
      request.onerror = function () {
        ajaxErr(request);
      };
      request.send();
    },

    _setFileHtml: function() {
      var self = this;
      /**
       * Call for get the scss file of component
       */
      var request = new XMLHttpRequest();
      request.open('GET', self._fileHtml, true);
      var secondFile = '../' + self.componentName + '.html';
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Save the scss in a property
          self._slot = request.responseText;
        }
        else if (self._file !== secondFile) {
          self._fileHtml = secondFile;
          self._setFileHtml();
        }
        else {
          self._propertiesBinded = self.propertiesSetted;
          console.error('file not found');
        }
      };
      request.onerror = function () {
        ajaxErr(request);
      };
      request.send();
    },

    _showToast: function (e) {
      this.$$('#toast').text = e.type;
      this.$$('#toast').open();
    },

    _setProperties: function () {
      var newProperties = "";
      var html = "";
      var snippet = "";
      var style = "";
      var script = "";
      var data = "";
      var propertyData = "";
      var slot = "";

      /**
       * Do the fragment of style
       */
      if (this._mixins.length > 0) {
        style += `<style is="custom-style">
        ${this.componentName} {`
        for (var j = 0; j < this._mixins.length; j++) {
          style += `
          ${this._mixins[j].mixin} : ${this._mixins[j].value};`
        }
        style += `
        }
      </style>`
      }

      /**
       * Do the fragment of components properties
       */
      for (var i = 0; i < this._propertiesBinded.length; i++) {

        if ((this._propertiesBinded[i].list) && (this._propertiesBinded[i].list[this._propertiesBinded[i].selected].value !== "false")) {
          if (this._propertiesBinded[i].list[this._propertiesBinded[i].selected].value === "true") {
            newProperties += ' ' + this._propertiesBinded[i].label;
          } else {
            newProperties += this._propertiesBinded[i].label + '="' + this._propertiesBinded[i].list[this._propertiesBinded[i].selected].value + '" ';
          }
        } else {
          if (!this._propertiesBinded[i].list) {
            newProperties += this._propertiesBinded[i].label + '="' + this._propertiesBinded[i].value + '" '
          }
        }
      }

      /**
       * Do the fragment of slot
       */
      if(this.allowSlot) {
        slot = this.slotted;
      } else {
        slot = '';
      }

      /**
       * Do the fragment script for data component
       */
      if(this.propertyBindedData) {
        data += `<iron-ajax auto url="${this.dataUrl}" handle-as="json" last-response="{{main}}"></iron-ajax>`
        propertyData += `${this.propertyBindedData}="[[main]]"`
      }

      /**
       * Do the fragment script for the methods in component
       */
      if((this.methods) && (this.methods !== [])) {
        script += `<script>
        (function(demo) {
          var component = demo.querySelector('#component');`
        for(var i = 0; i< this.methods.length; i++) {
          script += `
          demo.addEventListener('${this.methods[i]}', function() {
            component.${this.methods[i]}();
          })`
        }
        script += `
        })(document.querySelector('#demo'));
      </script>`
      }



      /**
       * Add all code in markdown
       */
      html = `<template is="dom-bind" id="demo">
      ${style}
      ${data}
      <${this.componentName} ${propertyData} ${newProperties} id="component" >
      ${slot}
      </${this.componentName}>
      ${script}
      </template>`
      snippet = '<'+ this.componentName + ' ' + propertyData.newProperties + '></'+ this.componentName + '>'
      this.children[0].innerHTML = html;
      this.children[0]._markdown = '```' + snippet + '```';
    },

    _setScss: function (_scss) {
      var mixin = [];
      var array = []
      // Find the first word
      var reg1 = /([^\s]+)/;
      // Find the second word
      var reg2 = /\s+([^\s]+)/;
      for (var i = 0; i < _scss.split('var(').length; i++) {
        if (i > 0) {
          var item = _scss.split('var(')[i].match(reg1)[0].slice(0, -1);
          var value = _scss.split('var(')[i].match(reg2)[0].slice(1, -2);
          if(array.indexOf(item) === -1) {
            if(_scss.split('var(')[i].match(reg2)[0].slice(-3) === '));') {
              value = _scss.split('var(')[i].match(reg2)[0].slice(1, -3)
            }
            mixin.push({
              "mixin": item,
              "value": value
            });
            array.push(item)
          }
        }
      }
      this._mixins = mixin;
      this._propertiesBinded = this.propertiesSetted;
    },

    _setSlot: function (_slot) {
      var arraySlot = [];
      var array = [];
      var slot = '';
      // Find the first word
      var reg1 = /([^\s]+)/;
      for (var i = 0; i < _slot.split('<slot').length; i++) {
        if (i > 0) {
          if(_slot.split('<slot name="')[i]) {
            var item = _slot.split('<slot name="')[i].match(reg1)[0].slice(0, -2);
          } else {
            var item = ""
          }
          if(array.indexOf(item) === -1) {
            arraySlot.push({
              "slot": item
            });
            array.push(item);
          }
        }
      }
      this.slot = arraySlot;
      for(var i = 0; i < this.slot.length; i++) {
        if(this.slot[i].slot !== "") {
      slot += `
      <div slot="${this.slot[i].slot}">
      </div>`;
        } else {
      slot += `
      <div>
      slot without name
      </div>`;
        }
      }
      this.slotted = slot;
    },

    _computeColor: function(item) {
      if(item.mixin.slice(-5) === 'color') {
        return true;
      }
      return false;
    },
    _setMethod: function(e) {
      this.dispatchEvent(new CustomEvent(e.target.id, {
        bubbles: true,
        composed: true,
        detail: e.target.id
      }));
    }

  });
}());
