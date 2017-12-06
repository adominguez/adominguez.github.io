(function () {
  'use strict';
  Polymer({

    is: 'adom-card-color',

    properties: {
      /**
       * set a heading in the card
       */
      heading: {
        type: String,
        value: 'title'
      },
      /**
       * set the resource
       */
      resource: {
        type: String,
        value: 'https://github.com'
      },
      /**
       * Set an array with label
       */
      label: {
        type: Array,
        value: function() {
          return []
        }
      },
      /**
       * image of component
       */
      img: {
        type: String,
        value: null,
        observer: '_setImg'
      },
      /**
       * set a description in the card
       */
      description: {
        type: String,
        value: null
      },
      /**
       * set the color of the card
       */
      color: {
        type: String,
        value: '#00897b',
        observer: '_setColor'
      },
      /**
       * Name of webcomponent to show in .ribbon
       */
      webcomponent: {
        type: String,
        value: null
      },
      /**
       * if it´s true the footer is hidden
       */
      noFooter: {
        type: Boolean,
        value: false
      },
      /**
       * level of heading
       */
      ariaHeadingLevel: {
        type: String,
        value: "2",
        observer: '_headingLevel'
      },

    },
    /**
     * set the level and the role of the heading
     */
    _headingLevel: function () {
      var heading = this.$$('#heading');
      if (this.ariaHeadingLevel >= 1 && this.ariaHeadingLevel <= 6) {
        heading.setAttribute('role', 'heading');
        heading.setAttribute('aria-level', this.ariaHeadingLevel);
      } else {
        heading.removeAttribute('role');
        heading.removeAttribute('aria-level');
      }
    },
    _setImg: function (newVal) {
      if(!newVal) {
        this.img = 'https://basepublica.org/img/avatar_placeholder.png';
      }
    },
    _setColor: function() {
      this.customStyle['--adom-card-color-bg-color'] = this.color;
      this.updateStyles();
    },
    /**
     * set Demo
     */
    _setDemo: function() {
      /**
       * Fired when button demo is clicked
       * @event adom-card-color-demo
       * @param heading
       */
      this.dispatchEvent(new CustomEvent('adom-card-color-demo', {
        bubbles: true,
        composed: true,
        detail: this.heading
      }));
    },
    /**
     * set Documentation
     */
    _setDocumentation: function() {
      /**
       * Fired when button documentation is clicked
       * @event adom-card-color-documentation
       * @param heading
       */
      this.dispatchEvent(new CustomEvent('adom-card-color-documentation', {
        bubbles: true,
        composed: true,
        detail: this.heading
      }));
    },
    /**
     * set Resource
     */
    _setResource: function() {
      /**
       * Fired when button resource is clicked
       * @event adom-card-color-resource
       * @param resource
       */
      this.dispatchEvent(new CustomEvent('adom-card-color-resource', {
        bubbles: true,
        composed: true,
        detail: this.resource
      }));
    }
  });
}());
