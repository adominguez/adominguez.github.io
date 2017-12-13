(function () {
  'use strict';
  Polymer({

    is: 'app-page',

    properties: {
      /**
       * if is true dont show the panel right
       */
      hidePanelRight: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * if is true the header doesn´t show
       */
      hideHeader: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      /**
       * if is true the header doesn´t show
       */
      hideFooter: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * if is true the header doesn´t show
       */
      hideSidebar: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * if is true the header shows at 100%
       */
      fullHeader: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * if is true the footer shows at 100%
       */
      fullFooter: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * if is true show the overlay
       */
      showOverlay: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * If is true show an animation to load the page
       */
      fadeIn: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * If is true the component is responsive to 770px
       */
      responsive: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * If is true show a progress bar for loading
       */
      showProgressBar: {
        type: Boolean,
        value: false
      },
      /**
       * If is true shows a bottom region
       */
      showBottomsheet: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    },

    ready: function() {
      Polymer.RenderStatus.afterNextRender(this, function() {
        let _self = this;
        window.addEventListener('resize', function() {
          if(_self.responsive && document.documentElement.clientWidth > 768) {
            _self.closeSidebar();
          }
        })
      })
    },

    /**
     * if the component is responsive, the device is minor than 768px and hideSidebar is false open the sidebar
     */
    openSidebar: function() {
      if(this.responsive && document.documentElement.clientWidth <= 768 && !this.hideSidebar) {
        this.$.sidebar.style= "z-index: 999";
        this.$.sidebar.classList.add('opened');
        this.$.overlay.classList.add('hide-content');
        this.showOverlay = true;
      }
    },
    /**
     * This close the sidebar if the sidebar is opened
     */
    closeSidebar: function() {
      if(this.$.sidebar.classList.contains('opened')) {
        this.$.sidebar.classList.remove('opened');
        this.showOverlay = false;
        this.$.overlay.classList.remove('hide-content');
      }
    },
    /**
     * Open the overlay
     */
    openOverlay: function() {
      this.showOverlay = true;
    },
    /**
     * Close the overlay
     */
    closeOverlay: function() {
      this.showOverlay = false;
    },
    /**
     * start the loading of page
     */
    startLoading: function() {
      this.showProgressBar = true;
    },
    /**
     * stop the loading of page
     */
    stopLoading: function() {
      this.showProgressBar = false;
    },
    /**
     * Open bottomsheet
     */
    openBottomSheet: function() {
      this.showBottomsheet = true;
    },
    /**
     * Open bottomsheet
     */
    closeBottomSheet: function() {
      this.showBottomsheet = false;
    },

  });
}());
