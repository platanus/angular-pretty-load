(function(){
  'use strict';

  var INIT_CLASS = 'pretty-load-init';
  var LOADING_CLASS = 'pretty-load-loading';
  var COMPLETED_CLASS = 'pretty-load-completed';
  
  angular
    .module('platanus.prettyLoad')
    .directive('prettyLoad', prettyLoad);

  /* ngInject */
  function prettyLoad() {

    return {
      restrict: 'A',

      scope: {
        prettyLoadWidth: '@',
        prettyLoadHeight: '@'
      },

      link: function(_scope, _element, _attributes) {
        var settings = {
          referenceWidth: _scope.prettyLoadWidth,
          referenceHeight: _scope.prettyLoadHeight,
          referenceColor: _attributes.prettyLoadColor || "white",
          shouldSetImageWidth: _element[0].width == 0,
          shouldSetImageHeight: _element[0].height == 0
        };

        var image = _element;
        var wrapper = createWrapper(image);
        var overlay = createOverlay(wrapper, settings.referenceColor);

        setImageSize(image, settings);
        setOverlayPositionAndSize(overlay, image);

        monitorLoading(wrapper, image);
        watchResizeEvent(_scope, image, overlay, settings);
      }
    }
  }

  //// Private Methods

  function createWrapper(_image) {
    var html = "<div class='pretty-load-wrapper'></div>";
    _image.wrap(html);

    var wrapper = _image.parent();

    wrapper.css({
      position: "relative"
    });

    return wrapper;
  }

  function createOverlay(_wrapper, _referenceColor) {
    var html = '<div class="pretty-load-overlay"></div>';
    var overlay = angular.element(html);

    _wrapper.append(overlay);

    overlay.css({
      position: 'absolute',
      backgroundColor: _referenceColor
    });

    return overlay;
  }

  function monitorLoading(wrapper, image) {
    setTimeout(function() {
      wrapper.addClass(LOADING_CLASS);

      whenImageIsLoaded(image, function() {
        wrapper.removeClass(LOADING_CLASS);
        wrapper.addClass(COMPLETED_CLASS);
      });
    }, 0);
  }

  function watchResizeEvent(_scope, _image, _overlay, _settings) {
    var callback = function() {
      setImageSize(_image, _settings);
      setOverlayPositionAndSize(_overlay, _image);
    }

    window.addEventListener('resize', callback);

    _scope.$on('$destroy', function() {
      window.removeEventListener('resize', callback)
    });
  }

  function setImageSize(_image, _settings) {
    var imageNode = _image[0];
    if(_settings.shouldSetImageWidth && _settings.shouldSetImageHeight) {
      imageNode.width = _settings.referenceWidth;
      imageNode.height = _settings.referenceHeight;
    }
    else {
      var ratio = _settings.referenceWidth / _settings.referenceHeight;

      if(_settings.shouldSetImageWidth)   imageNode.width = imageNode.clientHeight * ratio;
      if(_settings.shouldSetImageHeight)  imageNode.height = imageNode.clientWidth / ratio;
    }
  };

  function setOverlayPositionAndSize(_overlay, _image) {
    _overlay.css({
      top: '0px',
      left: '0px',
      width: _image[0].clientWidth + 'px',
      height: _image[0].clientHeight + 'px'
    });
  }

  function checkLoaded(_image) {
    if (!_image.complete) return false;
    if (_image.naturalWidth === 0) return false;
    return true;
  };

  function whenImageIsLoaded(_image, _callback) {
    var checkInterval = setInterval(function(){
      if ( checkLoaded(_image[0]) ) {
        clearInterval(checkInterval);
        _callback.call();
      }
    }, 200);
  };

})();
