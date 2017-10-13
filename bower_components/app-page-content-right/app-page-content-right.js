(function () {
  'use strict';
  Polymer({

    is: 'app-page-content-right',

    properties: {
      githubAccount: {
        type: String,
        value: 'adominguez'
      },
      componentName: {
        type: String,
        observer: '_setComponentName'
      },
      view: {
        type: String,
        notify: true
      },
      _bowerUrl: {
        type: String
      },
      _cloneUrl: {
        type: String
      },
      _githubUrl: {
        type: String
      }
    },
    changeView: function(event) {
      var demo = this.$.demo
      var documentation = this.$.documentation
      if(event.currentTarget === demo) {
        this.view = 'demo'
      } else {
        this.view = 'documentation';
      }
      this.dispatchEvent(new CustomEvent('change-view', {
        bubbles: true,
        composed: true,
        detail: {type: this.view, component: this.componentName}
      }))
    },
    goGithub: function() {
      this.dispatchEvent(new CustomEvent('go-github', {
        bubbles: true,
        composed: true,
        detail: this._githubUrl
      }))
    },
    _setComponentName: function() {
      this._bowerUrl = this.githubAccount + '/' + this.componentName;
      this._cloneUrl = 'https://github.com/'+this.githubAccount + '/' + this.componentName+'.git';
      this._githubUrl = 'https://github.com/'+this.githubAccount + '/' + this.componentName;
    },
    _bowerCopy: function() {
      this._contentCopy(this.$.bowerBody);
    },
    _cloneCopy: function() {
      this._contentCopy(this.$.cloneBody);
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
    }
  });
}());
