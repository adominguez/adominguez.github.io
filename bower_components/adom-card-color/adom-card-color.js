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
        value: '#fff',
        observer: '_setColor'
      },
      /**
       * set the icon of the card
       */
      icon: {
        type: String,
        value: null
      },
      /**
       * Number of items
       */
      counter: {
        type: Number,
        value: null
      },
      /**
       * Number of units
       */
      units: {
        type: String,
        value: null
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
    _setColor: function() {
      this.customStyle['--adom-card-color-bg-color'] = this.color;
      this.updateStyles();
    },
    /**
     * Reset component
     */
    reset: function() {
      this.dispatchEvent(new CustomEvent('adom-card-color-reset', {
        bubbles: true,
        composed: true
      }));
    }
  });
}());
