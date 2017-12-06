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
        observer: '_setComponentName'
      },
      _componentDescription: {
        type: String
      },
      /**
       * Is the route of bower.json component by default is ../../bower.json
       */
      bower: {
        type: String,
        value: '../../bower.json'
      },
      /**
       * Is the route of package.json component by default is ../../bower.json
       */
      package: {
        type: String,
        value: '../../package.json'
      },
      /**
       * Is the route of analysis.json component by default is '../../analysis.json'
       */
      descriptorUrl: {
        type: String,
        value: '../../analysis.json'
      },
      /**
       * Is the route of css component by default is '../../component-name-styles.html'
       */
      cssUrl: {
        type: String
      },
      _metadata: {
        type: Object,
        value: function () {
          return {};
        }
      },
      _package: {
        type: Object,
        value: function () {
          return {};
        }
      },
      _analysis: {
        type: Object,
        value: function () {
          return {};
        },
      },
      _cssStyles: {
        type: String
      },
      _cssVars: {
        type: Array,
        value: function () {
          return [];
        },
      },
      _cssMixins: {
        type: Array,
        value: function () {
          return [];
        },
      },
      _propertiesComponent: {
        type: Array,
        value: function () {
          return [];
        }
      },
      _eventsComponent: {
        type: Array,
        value: function () {
          return [];
        }
      },
      _methodsComponent: {
        type: Array,
        value: function () {
          return [];
        }
      },
      _slotsComponent: {
        type: Array,
        value: function () {
          return [];
        }
      },
      /**
       * If it´s true show the demo page
       */
      showDemo: {
        type: Boolean,
        value: false,
        observer: '_setDemo'
      },
      /**
       * The number of demo property is selected
       * component responsive: 0
       * component properties: 1
       * component css vars: 2
       * component methods: 3
       * component slot: 4
       * component data: 5
       */
      optionSelected: {
        type: Number,
        value: 0
      },
      /**
       * If it´s true show the demo page
       */
      device: {
        type: Array,
        value: function () {
          return {
            'width': '360px',
            'height': '480px'
          };
        }
      },
      /**
       * This show the built of component
       */
      padding: {
        type: Number,
        value: 0
      },
      /**
       * This show the built of component
       */
      _builtComponent: {
        type: String
      },
      /**
       * This show the built of component
       */
      allowSlot: {
        type: Boolean,
        value: false
      },
      /**
       * Save the slots content
       */
      _slotted: {
        type: String
      },
      /**
       * This property built the iframe
       */
      _builtIframe: {
        type: String
      }
    },

    ready: function() {
      Polymer.RenderStatus.afterNextRender(this, function() {
        var self = this;
        var docView = this.shadowRoot.querySelectorAll('.main__content__wrap__views__doc__right-panel__doc-view');
        window.addEventListener('scroll', function() {
          self.$.installation
          if(pageYOffset === 0) {
            self.$.menuDoc.style.top = '300px';
          }
          if(pageYOffset > 0 && pageYOffset <= 300) {
            self.$.menuDoc.style.top = 300 - pageYOffset + 'px';
          }
          if(pageYOffset > 300) {
            self.$.menuDoc.style.top = 0;
          }
        });
        this._getResize(550);
        var self = this;
        window.addEventListener('resize', function() {
          self._getResize(550);
        })
      })
    },

    _setEvents: function () {
      var events = '';
      this._eventsComponent.forEach(function(element) {
        events += `
          this.addEventListener('${element.name}', function(e) {
            showToast('${element.name}' , e);
          });
        `
      });
      events += `
        function showToast(event, e) {
          document.querySelector('#toast').classList.add('show');
          document.querySelector('#toastEvent').innerHTML = '<span class="text">event:</span> ' + event;
          if(e.detail) {
            document.querySelector('#detail').innerHTML = '<span class="text">detail:</span> ' + e.detail;
          }
          setTimeout(function() {
            removeToast();
          }, 10000);
        }
        function removeToast() {
          document.querySelector('#toast').classList.remove('show');
        }
      `
      return events;
    },

    _getBower: function () {
      this.$.clone.querySelector('code').innerHTML = '$ git clone ' + this._metadata.repository.url
    },
    _getBowerError: function () {
      console.error('This component has problem to show the bower, please define bower property with your route');
    },
    _getPackage: function() {

    },
    _getPackageError: function () {
      console.error('This component has problem to show the bower, please define package property with your route');
    },
    _getCss: function (e) {
      this._cssVarsformated();
      this._cssMixinsformated();
      this._buildIframe();
    },
    _getCssError: function () {
      console.error('This component has problem to show the css, please define cssFile property with your route');
    },
    _cssVarsformated: function () {
      var arrVars = [];
      var array = [];
      // Find the first word
      var reg1 = /([^\s]+)/;
      // Find the second word
      var reg2 = /\s+([^\s]+)/;

      this._cssStyles.split('var(').forEach(function (element, i) {
        if (i > 0) {
          var item = this._cssStyles.split('var(')[i].match(reg1)[0].slice(0, -1);
          var value = this._cssStyles.split('var(')[i].match(reg2)[0].slice(1, -2);
          if (array.indexOf(item) === -1) {
            if (this._cssStyles.split('var(')[i].match(reg2)[0].slice(-3) === '));') {
              value = this._cssStyles.split('var(')[i].match(reg2)[0].slice(1, -3);
            }
            arrVars.push({
              "varName": item,
              "description": item.slice(this.componentName.length + 3),
              "value": value,
              "special": item.slice(-5) === 'color' ? 'color' : ''
            });
            array.push(item);
          }
        }
      }, this);
      this._cssVars = arrVars;
    },
    _cssMixinsformated: function () {
      var arrMixins = [];
      var mixins = this._cssStyles.toString().match(new RegExp(`@apply --${this.componentName}(-*\\w*)*`, 'g'));
      mixins.forEach(function (element) {
        if (element.slice(this.componentName.length + 10) !== "") {
          arrMixins.push({
            "mixin": element.slice(7),
            "description": "empty mixin for ." + element.slice(this.componentName.length + 10)
          });
        } else {
          arrMixins.push({
            "mixin": element.slice(7),
            "value": "empty mixin for :host"
          });
        }
      }, this);
      this._cssMixins = arrMixins;
    },
    _getAnalysis: function () {
      var properties = [];
      var slots = [];
      var methods = [];
      //Formated Array for _propertiesComponent
      this._analysis.elements[0].properties.forEach(function (element) {
        properties.push({
          "name": element.name,
          "nameHtml": element.name.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^_/, ""),
          "description": element.description,
          "defaultValue": element.defaultValue !== "null" && element.type === "string" ? element.defaultValue.slice(1, -1) : element.defaultValue === "null" ? '' : element.defaultValue,
          "privacy": element.privacy,
          "type": element.type,
          "special": element.name.slice(-5) === 'color' ? 'color' : ''
        });
      });
      //Formated Array for _eventsComponent
      this.set('_componentDescription', this._analysis.elements[0].description);
      //Formated Array for _eventsComponent
      this.set('_eventsComponent', this._analysis.elements[0].events);
      //Formated Array for _methodsComponent
      this._analysis.elements[0].methods.forEach(function(element) {
        methods.push({
          "name": element.name,
          "description": element.description,
          "privacy": element.privacy,
          "params": element.params
        });
      });
      this._methodsComponent = methods;
      //Formated Array for _slotsComponent
      this._analysis.elements[0].slots.forEach(function(element) {
        slots.push({
          "name": element.name,
          "description": element.description
        });
      });

      this._slotsComponent = slots;
      /**
       * Format the slotted property
       */
      var slotted = '';
      this._slotsComponent.forEach(function(element) {
        slotted += `
        <div slot="${element.name}">
          ${element.name} slot
        </div>
        `
      });
      this._slotted = slotted;

      this._propertiesComponent = properties;
    },
    _getAnalysisError: function () {
      console.error('This component has problem to show the analysis, please define descriptorUrl property with your route');
    },
    _computeLibrary(library) {
      switch (library) {
        case 'Polymer 1':
        case 'Polymer hybrid':
        case 'Polymer 2':
        case 'Polymer 3':
          return '../adom-demo-helper-properties/images/polymer.svg';
          break;
        case 'VueJs':
          return '../adom-demo-helper-properties/images/vuejs.svg';
          break;
        case 'Angular 1':
        case 'Angular 2':
          return '../adom-demo-helper-properties/images/angular.svg';
          break;
        default:
          return;
          break;
      }
    },
    _computeProperties: function (property) {
      return property.privacy === 'public' ? false : true;
    },
    _computeMethods: function (property) {
      return property.privacy === 'protected' ? true : false;
    },
    _computeType: function(property) {
      if (property.type === "boolean") {
        return true;
      } else {
        return false;
      }
    },
    _computeColor: function(item) {
      return item.special === 'color' ? true : false;
    },
    _setDevice(e) {
      var device;
      switch (e.currentTarget) {
        case this.$.mobile:
          this.$.phone.classList.remove('main__content__wrap__views__demo__fullsize');
          this.$.phone.classList.add('main__content__wrap__views__demo__phone');
          device = {
            'width': '360px',
            'height': '480px'
          }
          break;
        case this.$.tablet:
          this.$.phone.classList.remove('main__content__wrap__views__demo__fullsize');
          this.$.phone.classList.add('main__content__wrap__views__demo__phone');
          device = {
            'width': '768px',
            'height': '1024px'
          }
          break;
        case this.$.desktop:
          this.$.phone.classList.remove('main__content__wrap__views__demo__fullsize');
          this.$.phone.classList.add('main__content__wrap__views__demo__phone');
          device = {
            'width': '1024px',
            'height': '769px'
          }
          break;
        case this.$.fullsize:
          device = {
            'width': '100%',
            'height': '769px'
          }
          this.async(function () {
            this.$.phone.classList.remove('main__content__wrap__views__demo__phone');
            this.$.phone.classList.add('main__content__wrap__views__demo__fullsize');
          }, 600);
          break;

      }
      this.device = device;
    },
    _setComponentName: function (value) {
      this.cssUrl = '../../' + value + '-styles.html'
    },
    _setView: function (e) {
      if (e.currentTarget === this.$.buttonDemo) {
        this.showDemo = true;
      } else {
        this.showDemo = false;
      }
      e.currentTarget.blur();
    },
    _setDemo: function (value) {
      if (value) {
        this.$.selector.classList.add('transition');
        this.$.viewDemo.hidden = false;
        this.$.titleView.innerHTML = 'Demo';
        this.$.menuDoc.hidden = true;
        this.$.viewDoc.hidden = true;
      } else {
        this.$.selector.classList.remove('transition');
        this.$.menuDoc.hidden = false;
        this.$.viewDoc.hidden = false;
        this.$.titleView.innerHTML = 'Documentation';
        this.$.viewDemo.hidden = true;
      }
    },
    /**
     * Copy the component on click in the button copy
     */
    copyContent: function() {
      var iconCopy = this.$.iconCopy;
      this._contentCopy(this.$.code);
      iconCopy.icon = "vaadin:copy";
      setTimeout(function() {
        iconCopy.icon = "vaadin:file-o";
      }, 3000);
    },
    _buildComponent: function () {
      var properties = '';
      var styles = '';
      /**
       * Format the properties of component
       */
      this._propertiesComponent.forEach(function (element) {
        if (element.type === 'string' && element.defaultValue !== "") {
          properties += element.nameHtml + '="' + element.defaultValue + '" ';
        }
        if(element.type === 'boolean') {
          if(element.defaultValue === 1) {
            element.defaultValue = 'true';
          } else {
            element.defaultValue = 'false';
          }
        }
        if (element.type === 'boolean' && element.defaultValue === 'true') {
          properties += element.nameHtml + ' ';
        }
        if (element.type === 'Array' && element.defaultValue !== '[]') {
          properties += element.nameHtml + "='" + element.defaultValue + "'"
        }
      });

      /**
       * Format the styles of component
       */
      this._cssVars.forEach(function(element) {
        styles += `${element.varName}: ${element.value};
          `
      });

      this.allowSlot = this.$.checkSlot.checked;

      this._builtComponent = `
      <style is="custom-style">
        ${this.componentName} {
          ${styles}
        }
      </style>
      <${this.componentName} ${properties}>
      ${this.allowSlot ? this._slotted : ''}
      <${this.componentName}/>`
    },
    _buildIframe: function () {
      this._buildComponent();
      this._builtIframe = `<!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <title>${this.componentName} demo</title>
        <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
        <script>
          window.Polymer = {
            dom: 'shadow',
            lazyRegister: 'true',
            useNativeCSSProperties: 'true'
          }
        </script>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic" crossorigin="anonymous">
        <link rel="import" href="../${this.componentName}.html">
        <style is="custom-style" include="demo-pages-shared-styles">
          /*Common styles*/
          body {
            font-family: Roboto;
            margin: 0;
            background-color: #fff;
            padding: ${this.padding}px;
            box-sizing: border-box;
          }
          .toast {
            outline: none;
            position: fixed;
            box-sizing: border-box;
            left: 10px;
            top: 0;
            transform: translateY(-100px);
            background-color: rgba(0, 0, 0, 0.8);
            color: #d32f2f;
            border-radius: 5px;
            transition: transform ease 200ms;
            padding: 8px;
            font-weight: 100;
          }
          .show {
            transform: translateY(10px);
            outline: none;
            z-index: 103;
            display: block;
          }
          .detail {
            color: #0097a7;
          }
          .text {
            color: white;
            font-weight: bolder;
          }
        </style>
      </head>
      <body>
        <template is="dom-bind">
          ${this._builtComponent}
          </template>
        <div id="toast" class="toast" onClick="removeToast()">
          <div class="toastEvent" id="toastEvent">
          </div>
          <div class="detail" id="detail">
          </div>
        </div>
        <script>
          ${this._setEvents()}
        </script>
      </body>
      </html>
      `
    },
    _contentCopy: function(element) {
      var snipRange = document.createRange();
      snipRange.selectNodeContents(element);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(snipRange);
      var result = false;
      try {
        result = document.execCommand('copy');
        this.dispatchEvent(new CustomEvent('content-copied', {
          bubbles: true,
          composed: true,
          detail: result
        }));
      } catch (err) {
        // Copy command is not available
        Polymer.Base._error(err);
      }

      selection.removeAllRanges();
      return result;
    },

    _computePackage: function() {
      return this._package ? false : true
    },
    _computeBower: function() {
      return this._metadata ? false : true
    },
    _computeSlotDoc: function() {
      return this._slotsComponent !== [] ? false : true;
    },
    _setActiveDoc: function(e) {
      var buttons = this.shadowRoot.querySelectorAll('.menuDoc__button');
      var doc = this.shadowRoot.querySelector('#' +e.currentTarget.name);
      doc.scrollIntoView();
      buttons.forEach(function(element) {
        element.classList.remove('active');
      });
      e.currentTarget.classList.add('active')
    },
    _getResize: function(resize) {
      var self = this;
      if(window.innerWidth < resize) {
        self.$.fullsize.click();
      }
    }

  });
}());
