(function(o,n,e){"use strict";n.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(o,i){function t(){var o,t,r,s;for(o in f)a(c[o])&&i.cookies(o,e);for(o in c)t=c[o],n.isString(t)?t!==f[o]&&(i.cookies(o,t),s=!0):n.isDefined(f[o])?c[o]=f[o]:delete c[o];if(s){s=!1,r=i.cookies();for(o in c)c[o]!==r[o]&&(a(r[o])?delete c[o]:c[o]=r[o],s=!0)}}var r,c={},f={},s=!1,u=n.copy,a=n.isUndefined;return i.addPollFn(function(){var n=i.cookies();r!=n&&(r=n,u(n,f),u(n,c),s&&o.$apply())})(),s=!0,o.$watch(t),c}]).factory("$cookieStore",["$cookies",function(o){return{get:function(e){var i=o[e];return i?n.fromJson(i):i},put:function(e,i){o[e]=n.toJson(i)},remove:function(n){delete o[n]}}}])})(window,window.angular);