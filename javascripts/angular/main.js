var updateMetroMenu, updateMissedCalls;

updateMetroMenu = function(json) {
  return console.log('update Apps');
};

updateMissedCalls = function(calls) {
  return console.log('missCall: ' + calls);
};

myApp.controller('LauncherCtrl', [
  '$scope', 'AppFactory', function($scope, AppFactory) {
    var mySwiper, startActivityByModule, startActivityWithID;

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
      console.log('click');
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
  function() {
    return function(scope, el, attrs) {
      var element, hammer, target;

      console.log($(window).width());
      element = document.getElementById("swiper-container");
      hammer = new Hammer(element);
      target = void 0;
      hammer.on("hold", function(event) {
        target = $(event.target).closest('.app-wrapper');
        console.log('hold');
        console.log('clientX: ' + event.gesture.center.clientX);
        console.log('clientY: ' + event.gesture.center.clientY);
        $('.swiper-slide .app-wrapper').addClass('shake shake-constant shake-slow');
        target.removeClass('shake shake-constant shake-slow');
        return $(window).on('touchend', function() {
          $('.swiper-slide .app-wrapper').removeClass('shake shake-constant shake-slow');
          target = void 0;
          return $(window).off('touchend');
        });
      });
      hammer.on("drag", function(event) {
        var deltaX, deltaY;

        deltaX = event.gesture.deltaX;
        deltaY = event.gesture.deltaY;
        if (target === void 0) {

        } else {
          console.log('deltaX: ' + deltaX);
          console.log('deltaY: ' + deltaY);
          return target.css({
            '-webkit-transform': 'translate3d(' + deltaX + 'px,' + deltaY + 'px,0)'
          });
        }
      });
      return hammer.on("dragend", function(event) {
        event.gesture.preventDefault();
        console.log(event.type);
        if (target === void 0) {

        } else {
          target.css({
            '-webkit-transform': 'none',
            'transition': '0.5s'
          });
          return target = void 0;
        }
      });
    };
  }
]);
