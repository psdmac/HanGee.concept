var updateMetroMenu, updateMissedCalls;

updateMetroMenu = function(json) {
  return console.log('update Apps');
};

updateMissedCalls = function(calls) {
  return console.log('missCall: ' + calls);
};

myApp.controller('LauncherCtrl', [
  '$scope', '$rootScope', 'AppFactory', function($scope, $rootScope, AppFactory) {
    var mySwiper, startActivityByModule, startActivityWithID;

    $rootScope.appXY = {};
    $rootScope.positionXY = {};
    mySwiper = new Swiper('#swiper-container', {
      pagination: '.pagination',
      paginationClickable: true
    });
    $scope.apps = AppFactory.apps();
    $scope.fixedApps = AppFactory.fixedApps();
    startActivityWithID = function(id, packageName, activityName) {
      return MetroMenu.startActivity(id, packageName, activityName);
    };
    startActivityByModule = function(id, moduleName) {
      return MetroMenu.startActivity(id, moduleName);
    };
    return $scope.startActivity = function(id, packageName, activityName, moduleName) {
      if (moduleName === '') {
        startActivityWithID(id, packageName, activityName);
      }
      if (packageName !== '') {
        startActivityWithID(id, packageName, activityName);
      }
      return startActivityByModule(id, moduleName);
    };
  }
]);

myApp.controller('MainCtrl', ['$scope', function($scope) {}]);

myApp.directive('hammerSwipe', [
  '$rootScope', function($rootScope) {
    return function(scope, el, attrs) {
      var element, hammer, index, target;

      console.log($(window).width());
      element = document.getElementById("swiper-container");
      hammer = new Hammer(element);
      target = void 0;
      index = void 0;
      return hammer.on("hold", function(event) {
        var e;

        event.gesture.preventDefault();
        target = $(event.target).closest('.app-wrapper');
        try {
          index = target[0].attributes[1].value;
        } catch (_error) {
          e = _error;
        }
        if (index === void 0) {
          return console.log('not target');
        } else {
          $('.swiper-slide .app-wrapper').addClass('shake shake-constant shake-slow');
          return target.removeClass('shake shake-constant shake-slow');
        }
      });
    };
  }
]);

(function($) {
  var proto, _mouseInit;

  $.support.touch = typeof Touch === "object";
  if (!$.support.touch) {
    return;
  }
  proto = $.ui.mouse.prototype;
  _mouseInit = proto._mouseInit;
  $.extend(proto, {
    _mouseInit: function() {
      this.element.bind("touchstart." + this.widgetName, $.proxy(this, "_touchStart"));
      _mouseInit.apply(this, arguments_);
    },
    _touchStart: function(event) {
      if (event.originalEvent.targetTouches.length !== 1) {
        return false;
      }
      this.element.bind("touchmove." + this.widgetName, $.proxy(this, "_touchMove")).bind("touchend." + this.widgetName, $.proxy(this, "_touchEnd"));
      this._modifyEvent(event);
      $(document).trigger($.Event("mouseup"));
      this._mouseDown(event);
      return false;
    },
    _touchMove: function(event) {
      this._modifyEvent(event);
      this._mouseMove(event);
    },
    _touchEnd: function(event) {
      this.element.unbind("touchmove." + this.widgetName).unbind("touchend." + this.widgetName);
      this._mouseUp(event);
    },
    _modifyEvent: function(event) {
      var target;

      event.which = 1;
      target = event.originalEvent.targetTouches[0];
      event.pageX = target.clientX;
      event.pageY = target.clientY;
    }
  });
})(jQuery);

myApp.directive("mySortable", function() {
  return {
    link: function(scope, el, attrs) {
      el.sortable({
        revert: true,
        disabled: false,
        delay: 1000,
        create: function(event, ui) {
          return console.log('create');
        },
        start: function(event, ui) {
          return console.log('start');
        },
        stop: function(event, ui) {
          console.log('stop');
          return $('.swiper-slide .app-wrapper').removeClass('shake shake-constant shake-slow');
        }
      });
      return el.disableSelection();
    }
  };
});
