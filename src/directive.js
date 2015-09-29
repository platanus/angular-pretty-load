(function(){
  'use strict';

  angular
    .module('platanus.prettyLoad')
    .directive('prettyLoad', prettyLoad);

  /* ngInject */
  function prettyLoad() {
    var LOADING_CLASS = 'pretty-loading';
    var LOADED_CLASS = 'pretty-loaded';

    var checkLoaded = function(_image) {
      if (!_image.complete) return false;
      if (_image.naturalWidth === 0) return false;
      return true;
    };

    var monitorLoadState = function(_parent, _image) {
      var checkInterval = setInterval(function(){
        if ( checkLoaded(_image) ) {
          _parent.removeClass(LOADING_CLASS);
          _parent.addClass(LOADED_CLASS);
          clearInterval(checkInterval);
        }
      }, 200);
      _parent.addClass(LOADING_CLASS);
    };

    var setupOverlay = function(_parent) {
      var overlay = angular.element('<div class="pretty-load-overlay"></div>');
      _parent.append(overlay);

      overlay.css({ 
        position: 'absolute',
        backgroundColor: 'white'
      });

      return overlay;
    }

    var resizeImage = function(_image, _originalWidth, _originalHeight) {
      var ratio = _originalWidth / _originalHeight;

      if ( _image.width === 0 && _image.height === 0 ) {
        _image.width = _originalWidth;
        _image.height = _originalHeight;
      } else if ( _image.clientWidth > 0 ) {
        _image.height = _image.clientWidth / ratio;
      } else {
        _image.width = _image.clientHeight * ratio;
      }
    };

    var positionOverlay = function(_parent, _target, _overlay) {
      if(!_overlay) return;

      var parentRect = _parent.getBoundingClientRect(),
          targetRect = _target.getBoundingClientRect(),
          offsetTop = targetRect.top - parentRect.top,
          offsetLeft = targetRect.left - parentRect.left;

      _overlay.css({
        top: offsetTop + 'px',
        left: offsetLeft + 'px',
        width: _target.clientWidth + 'px',
        height: _target.clientHeight + 'px'
      });
    }

    return {
      restrict: 'A',
      scope: {
        prettyLoadWidth: '@',
        prettyLoadHeight: '@'
      },
      link: function(_scope, _element, _attributes) {
        var image = _element.find('img')[0];
        if ( !image ) return false;

        monitorLoadState(_element, image);
        var overlay = setupOverlay(_element);

        _attributes.$observe('prettyLoadColor', function(color){
          overlay.css({ 
            backgroundColor: color
          });        
        });

        var recalculateDimensions = function(){
          resizeImage(image, _scope.prettyLoadWidth, _scope.prettyLoadHeight);
          positionOverlay(_element[0], image, overlay);
        }; 

        _scope.$watch(function() { 
          if ( _scope.prettyLoadWidth && _scope.prettyLoadHeight ) {
            return _scope.prettyLoadWidth / _scope.prettyLoadHeight; 
          } else return 0;
        }, function(_ratio) {
          if ( _ratio == 0 ) return;
          recalculateDimensions();
        });
        
        window.addEventListener('resize', recalculateDimensions);

        _scope.$on('$destroy', function() {
          window.removeEventListener('resize', recalculateDimensions)
        });
      }
    }
  }

})();
