updateMetroMenu = (json) ->
  console.log 'update Apps'
updateMissedCalls = (calls) ->
  console.log 'missCall: '+calls 

myApp.controller 'LauncherCtrl', ['$scope','AppFactory', ($scope, AppFactory) ->
  mySwiper = new Swiper('#swiper-container',{
    pagination: '.pagination',
    paginationClickable: true,
  })
  $scope.apps = AppFactory.apps()
  $scope.fixedApps = AppFactory.fixedApps()


  startActivityWithID = (id, packageName, activityName) ->
    MetroMenu.startActivity(id, packageName, activityName)
  startActivityByModule = (id, moduleName) ->
      MetroMenu.startActivity(id, moduleName)
  $scope.startActivity = (id, packageName, activityName, moduleName) ->
    console.log 'click'
    if moduleName is ''
      startActivityWithID(id, packageName, activityName)
    if packageName isnt ''
      startActivityWithID(id, packageName, activityName)
    startActivityByModule(id, moduleName)
]

myApp.controller 'MainCtrl', ['$scope', ($scope) ->
  
]


myApp.directive 'hammerSwipe', [ ->
  (scope, el, attrs) ->
    console.log $(window).width()
    el = document.getElementById("swiper-container")
    hammer = new Hammer(el)
    target = undefined
    # 監聽長按
    hammer.on "hold", (event) ->
      event.gesture.preventDefault()
      target = $(event.target).closest('.app-wrapper')
      console.log target
      console.log 'pageX: '+event.gesture.center.pageX
      console.log 'pageY: '+event.gesture.center.pageY
      console.log 'clientX: '+event.gesture.center.clientX
      console.log 'clientY: '+event.gesture.center.clientY
      # 加入 shake
      $('.swiper-slide .app-wrapper').addClass('shake shake-constant shake-slow')
      target.removeClass('shake shake-constant shake-slow')
      # 取消長按
      $(document).on 'touchend', ->
        $('.swiper-slide .app-wrapper').removeClass('shake shake-constant shake-slow')
        target = undefined
        $(document).off 'touchend'
    hammer.on "tap", (event) ->
      # event.gesture.preventDefault()
      deltaX = event.gesture.deltaX
      console.log 'pageX: '+event.gesture.center.pageX
      console.log 'pageY: '+event.gesture.center.pageY
      console.log 'clientX: '+event.gesture.center.clientX
      console.log 'clientY: '+event.gesture.center.clientY
    hammer.on "drag", (event) ->
      event.gesture.preventDefault()
      deltaX = event.gesture.deltaX
      deltaY = event.gesture.deltaY
      console.log deltaX
      if target is undefined
      else
        console.log target
        target.css({
          '-webkit-transform': 'translate3d('+deltaX+'px,'+deltaY+'px,0)' 
        })
    hammer.on "dragstart", (event) ->
      event.gesture.preventDefault()
      console.log event
      console.log event.type
      console.log event.gesture.deltaX

    hammer.on "dragend", (event) ->
      event.gesture.preventDefault()
      console.log event
      console.log event.type
      console.log event.gesture.deltaX
      if target is undefined
      else
        target.css({
          '-webkit-transform': 'none'
          'transition': '0.5s'
        })
        target = undefined
]