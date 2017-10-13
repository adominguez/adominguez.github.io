(function () {
  'use strict';
  Polymer({

    is: 'app-page',

    properties: {
      /**
       * title of page
       */
      titlePage: {
        type: String,
        value: null
      },
      /**
       * subtitle of page
       */
      subtitlePage: {
        type: String,
        value: null
      },
      /**
       * Host of url
       */
      host: {
        type: String,
        value: 'https://adominguez.github.io/'
      },
      /**
       * Host of url
       */
      route: {
        type: String,
        value: 'bower_components/'
      },
      /**
       * file name
       */
      fileName: {
        type: String,
        value: null,
        observer: '_setTypeOfPage'
      },
      /**
       * type of file md | html
       */
      fileType: {
        type: String,
        value: 'html'
      },
      /**
       * component url
       */
      _fileUrl: {
        type: String,
        value: null
      },
      /**
       * Show demo or doc if it´s false show demo
       */
      showDoc: {
        type: Boolean,
        value: false,
        observer: '_setTypeOfPage'
      },
      /**
       * if is true dont show the panel right
       */
      hidePanelRight: {
        type: Boolean,
        value: false
      },
      /**
       * If is true show an animation to load the page
       */
      fadeIn: {
        type: Boolean,
        value: false
      },
      /**
       * If is true the component is responsive to 770px
       */
      responsive: {
        type: Boolean,
        value: false
      }
    },
    _setTypeOfPage: function() {
      var url;
      var demo = this.showDoc ? 'index.html' : 'demo/index.html';
      if(this.fileType === 'html') {
        url = `${this.host}${this.route}${this.fileName}/${demo}`;
        this.$.zero.hidden = true;
        this.$.iframe.hidden = false;
      } else {
        url = `${this.host}${this.route}${this.fileName}.md`;
        this.$.zero.hidden = false;
        this.$.iframe.hidden = true;
      }
      this._fileUrl = url;
    }

  });
}());
