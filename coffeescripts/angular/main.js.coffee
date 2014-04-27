updateMetroMenu = (json) ->
  console.log 'update Apps'
updateMissedCalls = (calls) ->
  console.log 'missCall: '+calls 

myApp.controller 'LauncherCtrl', ['$scope','$rootScope','AppFactory', ($scope, $rootScope, AppFactory) ->
  $rootScope.appXY = {}
  $rootScope.positionXY = {}
  mySwiper = new Swiper('#swiper-container',{
    pagination: '.pagination',
    paginationClickable: true,
  })
  $scope.apps = AppFactory.apps()
  $scope.fixedApps = AppFactory.fixedApps()

  # $scope.$on 'my-sorted', (ev, val) ->
  #   $scope.apps.splice(val.to, 0, $scope.apps.splice(val.from, 1)[0])

  startActivityWithID = (id, packageName, activityName) ->
    MetroMenu.startActivity(id, packageName, activityName)
  startActivityByModule = (id, moduleName) ->
      MetroMenu.startActivity(id, moduleName)
  $scope.startActivity = (id, packageName, activityName, moduleName) ->
    # console.log 'click'
    if moduleName is ''
      startActivityWithID(id, packageName, activityName)
    if packageName isnt ''
      startActivityWithID(id, packageName, activityName)
    startActivityByModule(id, moduleName)
]

myApp.controller 'MainCtrl', ['$scope', ($scope) ->
  
]

# myApp.directive 'getPosition', ['$rootScope', ($rootScope) ->
#   (scope, el, attrs) ->
#     target = $rootScope.appXY
#     target[attrs.index] = {}
#     target[attrs.index].TL = {}
#     target[attrs.index].BL = {}
#     target[attrs.index].TR = {}
#     target[attrs.index].BR = {}
#     target[attrs.index].center = {}
#     windowHeight = $(window).height()
#     if attrs.index >= 100
#       target[attrs.index].TL.X = target[attrs.index].BL.X = el[0].offsetLeft
#       target[attrs.index].TL.Y = target[attrs.index].TR.Y = el[0].offsetTop + windowHeight - 135
#       target[attrs.index].TR.X = target[attrs.index].BR.X = el[0].offsetLeft + el[0].offsetWidth
#       target[attrs.index].BL.Y = target[attrs.index].BR.Y = el[0].offsetTop  + el[0].offsetHeight + windowHeight - 135
#       target[attrs.index].center.X = el[0].offsetLeft + el[0].offsetWidth/2
#       target[attrs.index].center.Y = el[0].offsetTop  + el[0].offsetHeight/2 + windowHeight - 135
#     else
#       target[attrs.index].TL.X = target[attrs.index].BL.X = el[0].offsetLeft
#       target[attrs.index].TL.Y = target[attrs.index].TR.Y = el[0].offsetTop
#       target[attrs.index].TR.X = target[attrs.index].BR.X = el[0].offsetLeft + el[0].offsetWidth
#       target[attrs.index].BL.Y = target[attrs.index].BR.Y = el[0].offsetTop  + el[0].offsetHeight
#       target[attrs.index].center.X = el[0].offsetLeft + el[0].offsetWidth/2
#       target[attrs.index].center.Y = el[0].offsetTop  + el[0].offsetHeight/2
#     # $rootScope.appXY.push target
#     console.log $rootScope.appXY
# ]


myApp.directive 'hammerSwipe', ['$rootScope', ($rootScope) ->
  (scope, el, attrs) ->
    console.log $(window).width()
    element = document.getElementById("swiper-container")
    hammer = new Hammer(element)
    target = undefined
    index = undefined
    # 監聽長按
    hammer.on "hold", (event) ->
      event.gesture.preventDefault()
      target = $(event.target).closest('.app-wrapper')
      try
        index = target[0].attributes[1].value
      catch e

      if index is undefined
        console.log 'not target'
      else
        # 加入 shake
        $('.swiper-slide .app-wrapper').addClass('shake shake-constant shake-slow')
        target.removeClass('shake shake-constant shake-slow')
      
    # hammer.on "drag", (event) ->
    #   # event.gesture.preventDefault()
    #   deltaX = event.gesture.deltaX
    #   deltaY = event.gesture.deltaY
    #   if target is undefined
    #   else
    #     console.log index
    #     if index is undefined
    #     else
    #       $rootScope.positionXY.X = $rootScope.appXY[index].center.X + deltaX
    #       $rootScope.positionXY.Y = $rootScope.appXY[index].center.Y + deltaY
    #       console.log $rootScope.positionXY
    #       target.css({
    #         '-webkit-transform': 'translate3d('+deltaX+'px,'+deltaY+'px,0)' 
    #       })


    # hammer.on "dragend", (event) ->
    #   # event.gesture.preventDefault()
    #   # console.log event
    #   console.log event.type
    #   # console.log event.gesture.deltaX
    #   if target is undefined
    #   else
    #     # target.css({
    #     #   '-webkit-transform': 'none'
    #     #   'transition': '0.5s'
    #     # })
    #     target = undefined
    #     index = undefined
]

(($) ->
  $.support.touch = typeof Touch is "object"
  return  unless $.support.touch
  proto = $.ui.mouse::
  _mouseInit = proto._mouseInit
  $.extend proto,
    _mouseInit: ->
      @element.bind "touchstart." + @widgetName, $.proxy(this, "_touchStart")
      _mouseInit.apply this, arguments_
      return

    _touchStart: (event) ->
      return false  unless event.originalEvent.targetTouches.length is 1
      @element.bind("touchmove." + @widgetName, $.proxy(this, "_touchMove")).bind "touchend." + @widgetName, $.proxy(this, "_touchEnd")
      @_modifyEvent event
      $(document).trigger $.Event("mouseup") #reset mouseHandled flag in ui.mouse
      @_mouseDown event
      false

    _touchMove: (event) ->
      @_modifyEvent event
      @_mouseMove event
      return

    _touchEnd: (event) ->
      @element.unbind("touchmove." + @widgetName).unbind "touchend." + @widgetName
      @_mouseUp event
      return

    _modifyEvent: (event) ->
      event.which = 1
      target = event.originalEvent.targetTouches[0]
      event.pageX = target.clientX
      event.pageY = target.clientY
      return

  return
) jQuery

myApp.directive "mySortable", ->
  link: (scope, el, attrs) ->
    el.sortable
      revert: true
      disabled: false
      delay: 1000
      create: (event, ui) ->
        console.log 'create'
      start: (event, ui) ->
        console.log 'start'
      stop: (event, ui) ->
        console.log 'stop'
        $('.swiper-slide .app-wrapper').removeClass('shake shake-constant shake-slow')
    el.disableSelection()
    # el.on "sortdeactivate", (event, ui) ->
    #   from = angular.element(ui.app).scope().$index
    #   to = el.children().index(ui.app)
    #   if to >= 0
    #     scope.$apply ->
    #       if from >= 0
    #         scope.$emit "my-sorted",
    #           from: from
    #           to: to

    #       else
    #         scope.$emit "my-created",
    #           to: to
    #           name: ui.app.text()

    #         ui.app.remove()