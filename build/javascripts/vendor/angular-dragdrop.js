/**
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
(function(e,t,a){"use strict";var n=t.module("ngDragDrop",[]).service("ngDragDropService",["$timeout","$parse",function(i,l){this.callEventCallback=function(e,t,a,n){function i(t){var a=-1!==t.indexOf("(")?t.indexOf("("):t.length,n=-1!==t.lastIndexOf(")")?t.lastIndexOf(")"):t.length,i=t.substring(a+1,n),r=t.match(/^[^.]+.\s*/)[0].slice(0,-1);return r=e[r]&&"function"==typeof e[r].constructor?r:null,{callback:t.substring(r&&r.length+1||0,a),args:(i&&i.split(",")||[]).map(function(t){return l(t)(e)}),constructor:r}}if(t){var r=i(t),o=r.callback,s=r.constructor,d=[a,n].concat(r.args);e.$apply((e[o]||e[s][o]).apply(e,d))}},this.invokeDrop=function(e,l,r,o){var s,d,c="",p="",u={},g={},b=null,f={},h={},v=null,y=l.scope(),m=e.scope();c=e.ngattr("ng-model"),p=l.ngattr("ng-model"),s=m.$eval(c),d=y.$eval(p),v=l.find("[jqyoui-draggable]:last,[data-jqyoui-draggable]:last"),g=y.$eval(l.attr("jqyoui-droppable")||l.attr("data-jqyoui-droppable"))||[],u=m.$eval(e.attr("jqyoui-draggable")||e.attr("data-jqyoui-draggable"))||[],u.index=this.fixIndex(m,u,s),g.index=this.fixIndex(y,g,d),b=t.isArray(s)?u.index:null,f=t.copy(t.isArray(s)?s[b]:s),h=t.isArray(d)&&g&&g.index!==a?d[g.index]:t.isArray(d)?{}:d,h=t.copy(h),u.animate===!0?(this.move(e,v.length>0?v:l,null,"fast",g,null),this.move(v.length>0&&!g.multiple?v:[],e.parent("[jqyoui-droppable],[data-jqyoui-droppable]"),n.startXY,"fast",g,t.bind(this,function(){i(t.bind(this,function(){e.css({position:"relative",left:"",top:""}),v.css({position:"relative",left:"",top:"",display:""}),this.mutateDraggable(m,g,u,c,p,h,e),this.mutateDroppable(y,g,u,p,f,b),this.callEventCallback(y,g.onDrop,r,o)}))}))):i(t.bind(this,function(){this.mutateDraggable(m,g,u,c,p,h,e),this.mutateDroppable(y,g,u,p,f,b),this.callEventCallback(y,g.onDrop,r,o)}))},this.move=function(t,n,i,l,r,o){if(0===t.length)return o&&e.setTimeout(function(){o()},300),!1;var s=9999,d=t[r.containment||"offset"](),c=n&&n.is(":visible"),p=n.hasClass("ng-hide");null===i&&n.length>0&&((n.attr("jqyoui-draggable")||n.attr("data-jqyoui-draggable"))!==a&&n.ngattr("ng-model")!==a&&n.is(":visible")&&r&&r.multiple?(i=n[r.containment||"offset"](),r.stack===!1?i.left+=n.outerWidth(!0):i.top+=n.outerHeight(!0)):(p&&n.removeClass("ng-hide"),i=n.css({visibility:"hidden",display:"block"})[r.containment||"offset"](),n.css({visibility:"",display:c?"block":"none"}))),t.css({position:"absolute","z-index":s}).css(d).animate(i,l,function(){p&&n.addClass("ng-hide"),o&&o()})},this.mutateDroppable=function(e,a,n,i,r,o){var s=e.$eval(i);e.dndDragItem=r,t.isArray(s)?(a&&a.index>=0?s[a.index]=r:s.push(r),n&&n.placeholder===!0&&(s[s.length-1].jqyoui_pos=o)):(l(i+" = dndDragItem")(e),n&&n.placeholder===!0&&(s.jqyoui_pos=o))},this.mutateDraggable=function(e,n,i,r,o,s,d){var c=t.equals(s,{}),p=e.$eval(r);e.dndDropItem=s,i&&i.placeholder?"keep"!=i.placeholder&&(t.isArray(p)&&i.index!==a?p[i.index]=s:l(r+" = dndDropItem")(e)):t.isArray(p)?c?i&&i.placeholder!==!0&&"keep"!==i.placeholder&&p.splice(i.index,1):p[i.index]=s:(l(r+" = dndDropItem")(e),e.$parent&&l(r+" = dndDropItem")(e.$parent)),d.css({"z-index":"",left:"",top:""})},this.fixIndex=function(e,n,i){if(n.applyFilter&&t.isArray(i)&&i.length>0){var l=e[n.applyFilter](),r=l[n.index],o=a;return i.forEach(function(e,a){t.equals(e,r)&&(o=a)}),o}return n.index}}]).directive("jqyouiDraggable",["ngDragDropService",function(e){return{require:"?jqyouiDroppable",restrict:"A",link:function(a,i,l){var r,o,s,d=function(d){d?(r=a.$eval(i.attr("jqyoui-draggable")||i.attr("data-jqyoui-draggable"))||{},o=a.$eval(l.jqyouiOptions)||{},i.draggable({disabled:!1}).draggable(o).draggable({start:function(i,l){s=t.element(o.helper?l.helper:this).css("z-index"),t.element(o.helper?l.helper:this).css("z-index",9999),n.startXY=t.element(this)[r.containment||"offset"](),e.callEventCallback(a,r.onStart,i,l)},stop:function(n,i){t.element(o.helper?i.helper:this).css("z-index",s),e.callEventCallback(a,r.onStop,n,i)},drag:function(t,n){e.callEventCallback(a,r.onDrag,t,n)}})):i.draggable({disabled:!0})};a.$watch(function(){return a.$eval(l.drag)},d),d(),i.on("$destroy",function(){i.draggable("destroy")})}}}]).directive("jqyouiDroppable",["ngDragDropService",function(e){return{restrict:"A",priority:1,link:function(a,n,i){var l,r=function(r){r?(l=a.$eval(t.element(n).attr("jqyoui-droppable")||t.element(n).attr("data-jqyoui-droppable"))||{},n.droppable({disabled:!1}).droppable(a.$eval(i.jqyouiOptions)||{}).droppable({over:function(t,n){e.callEventCallback(a,l.onOver,t,n)},out:function(t,n){e.callEventCallback(a,l.onOut,t,n)},drop:function(n,r){t.element(r.draggable).ngattr("ng-model")&&i.ngModel?e.invokeDrop(t.element(r.draggable),t.element(this),n,r):e.callEventCallback(a,l.onDrop,n,r)}})):n.droppable({disabled:!0})};a.$watch(function(){return a.$eval(i.drop)},r),r(),n.on("$destroy",function(){n.droppable("destroy")})}}}]);$.fn.ngattr=function(e){var a=t.element(this).get(0);return a.getAttribute(e)||a.getAttribute("data-"+e)}})(window,window.angular);