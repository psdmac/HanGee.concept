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
      var hammer, target;

      console.log($(window).width());
      el = document.getElementById("swiper-container");
      hammer = new Hammer(el);
      target = void 0;
      hammer.on("hold", function(event) {
        event.gesture.preventDefault();
        target = $(event.target).closest('.app-wrapper');
        console.log(target);
        console.log('pageX: ' + event.gesture.center.pageX);
        console.log('pageY: ' + event.gesture.center.pageY);
        console.log('clientX: ' + event.gesture.center.clientX);
        console.log('clientY: ' + event.gesture.center.clientY);
        $('.swiper-slide .app-wrapper').addClass('shake shake-constant shake-slow');
        target.removeClass('shake shake-constant shake-slow');
        return $(document).on('touchend', function() {
          $('.swiper-slide .app-wrapper').removeClass('shake shake-constant shake-slow');
          target = void 0;
          return $(document).off('touchend');
        });
      });
      hammer.on("tap", function(event) {
        var deltaX;

        deltaX = event.gesture.deltaX;
        console.log('pageX: ' + event.gesture.center.pageX);
        console.log('pageY: ' + event.gesture.center.pageY);
        console.log('clientX: ' + event.gesture.center.clientX);
        return console.log('clientY: ' + event.gesture.center.clientY);
      });
      hammer.on("drag", function(event) {
        var deltaX, deltaY;

        event.gesture.preventDefault();
        deltaX = event.gesture.deltaX;
        deltaY = event.gesture.deltaY;
        console.log(deltaX);
        if (target === void 0) {

        } else {
          console.log(target);
          return target.css({
            '-webkit-transform': 'translate3d(' + deltaX + 'px,' + deltaY + 'px,0)'
          });
        }
      });
      hammer.on("dragstart", function(event) {
        event.gesture.preventDefault();
        console.log(event);
        console.log(event.type);
        return console.log(event.gesture.deltaX);
      });
      return hammer.on("dragend", function(event) {
        event.gesture.preventDefault();
        console.log(event);
        console.log(event.type);
        console.log(event.gesture.deltaX);
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
