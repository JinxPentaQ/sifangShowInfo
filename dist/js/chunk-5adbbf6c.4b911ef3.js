(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5adbbf6c"],{"099f":function(t,e,n){"use strict";n("c887")},"14d9":function(t,e,n){"use strict";var i=n("23e7"),a=n("7b0b"),r=n("07fa"),c=n("3a34"),o=n("3511"),s=n("d039"),u=s((function(){return 4294967297!==[].push.call({length:4294967296},1)})),f=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}},h=u||!f();i({target:"Array",proto:!0,arity:1,forced:h},{push:function(t){var e=a(this),n=r(e),i=arguments.length;o(n+i);for(var s=0;s<i;s++)e[n]=arguments[s],n++;return c(e,n),n}})},3511:function(t,e){var n=TypeError,i=9007199254740991;t.exports=function(t){if(t>i)throw n("Maximum allowed index exceeded");return t}},"3a34":function(t,e,n){"use strict";var i=n("83ab"),a=n("e8b5"),r=TypeError,c=Object.getOwnPropertyDescriptor,o=i&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=o?function(t,e){if(a(t)&&!c(t,"length").writable)throw r("Cannot set read only .length");return t.length=e}:function(t,e){return t.length=e}},"40db":function(t,e,n){},"414a":function(t,e,n){"use strict";n("68ef"),n("40db")},4598:function(t,e,n){"use strict";(function(t){n.d(e,"c",(function(){return u})),n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return h}));var i=n("a142"),a=Date.now();function r(t){var e=Date.now(),n=Math.max(0,16-(e-a)),i=setTimeout(t,n);return a=e+n,i}var c=i["g"]?t:window,o=c.requestAnimationFrame||r,s=c.cancelAnimationFrame||c.clearTimeout;function u(t){return o.call(c,t)}function f(t){u((function(){u(t)}))}function h(t){s.call(c,t)}}).call(this,n("c8ba"))},"4abe":function(t,e,n){"use strict";n.r(e);var i,a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"wrap"},[e("div",{staticStyle:{"text-align":"center","margin-top":"100px"}},[e("van-loading",{staticStyle:{dislplay:"inline-block"},attrs:{size:"24px"}}),t._v(" 您好，您该笔订单的入款信息正在火速为您准备中， "),e("br"),t._v(" 请不要关闭该页面。 "),e("br"),t._v(" 稍后会显示在该页面中，谢谢您耐心的等待！ "),e("br"),t._v(" 倒计时：( "),e("van-count-down",{staticStyle:{dislplay:"inline-block"},attrs:{time:t.time,format:" ss"}}),t._v(") ")],1)])},r=[],c=n("ade3"),o=(n("68ef"),n("e3b3"),n("543e")),s=(n("e7e5"),n("d399")),u=(n("c3a6"),n("ad06")),f=(n("414a"),n("7a82")),h=(n("c194"),n("7744")),d=(n("14d9"),{components:(i={},Object(c["a"])(i,h["a"].name,h["a"]),Object(c["a"])(i,f["a"].name,f["a"]),Object(c["a"])(i,u["a"].name,u["a"]),Object(c["a"])(i,s["a"].name,s["a"]),Object(c["a"])(i,o["a"].name,o["a"]),i),data:function(){return{str:"",timer:"",time:99e3}},methods:{getQueryString:function(){this.str=window.location.href.split("?")[1],this.str&&this.getData()},getData:function(){var t=this,e=this;e.$axios.get("PageController/getOngoingOrder?order_no="+this.str).then((function(e){1===e.data.data.pay_info_type?(t.$router.push({path:"btc",query:{time:t.str}}),clearInterval(t.timer)):window.open(e.data.data.address)})).catch((function(t){console.log(t)}))}},mounted:function(){this.getQueryString(),this.timer=setInterval(this.getData,5e3)}}),l=d,m=(n("099f"),n("2877")),p=Object(m["a"])(l,a,r,!1,null,"9ffbed18",null);e["default"]=p.exports},"7a82":function(t,e,n){"use strict";var i=n("d282"),a=n("a142"),r=n("4598"),c=n("68ed"),o=1e3,s=60*o,u=60*s,f=24*u;function h(t){var e=Math.floor(t/f),n=Math.floor(t%f/u),i=Math.floor(t%u/s),a=Math.floor(t%s/o),r=Math.floor(t%o);return{days:e,hours:n,minutes:i,seconds:a,milliseconds:r}}function d(t,e){var n=e.days,i=e.hours,a=e.minutes,r=e.seconds,o=e.milliseconds;if(-1===t.indexOf("DD")?i+=24*n:t=t.replace("DD",Object(c["b"])(n)),-1===t.indexOf("HH")?a+=60*i:t=t.replace("HH",Object(c["b"])(i)),-1===t.indexOf("mm")?r+=60*a:t=t.replace("mm",Object(c["b"])(a)),-1===t.indexOf("ss")?o+=1e3*r:t=t.replace("ss",Object(c["b"])(r)),-1!==t.indexOf("S")){var s=Object(c["b"])(o,3);t=-1!==t.indexOf("SSS")?t.replace("SSS",s):-1!==t.indexOf("SS")?t.replace("SS",s.slice(0,2)):t.replace("S",s.charAt(0))}return t}function l(t,e){return Math.floor(t/1e3)===Math.floor(e/1e3)}var m=Object(i["a"])("count-down"),p=m[0],b=m[1];e["a"]=p({props:{millisecond:Boolean,time:{type:[Number,String],default:0},format:{type:String,default:"HH:mm:ss"},autoStart:{type:Boolean,default:!0}},data:function(){return{remain:0}},computed:{timeData:function(){return h(this.remain)},formattedTime:function(){return d(this.format,this.timeData)}},watch:{time:{immediate:!0,handler:"reset"}},activated:function(){this.keepAlivePaused&&(this.counting=!0,this.keepAlivePaused=!1,this.tick())},deactivated:function(){this.counting&&(this.pause(),this.keepAlivePaused=!0)},beforeDestroy:function(){this.pause()},methods:{start:function(){this.counting||(this.counting=!0,this.endTime=Date.now()+this.remain,this.tick())},pause:function(){this.counting=!1,Object(r["a"])(this.rafId)},reset:function(){this.pause(),this.remain=+this.time,this.autoStart&&this.start()},tick:function(){a["b"]&&(this.millisecond?this.microTick():this.macroTick())},microTick:function(){var t=this;this.rafId=Object(r["c"])((function(){t.counting&&(t.setRemain(t.getRemain()),t.remain>0&&t.microTick())}))},macroTick:function(){var t=this;this.rafId=Object(r["c"])((function(){if(t.counting){var e=t.getRemain();l(e,t.remain)&&0!==e||t.setRemain(e),t.remain>0&&t.macroTick()}}))},getRemain:function(){return Math.max(this.endTime-Date.now(),0)},setRemain:function(t){this.remain=t,this.$emit("change",this.timeData),0===t&&(this.pause(),this.$emit("finish"))}},render:function(){var t=arguments[0];return t("div",{class:b()},[this.slots("default",this.timeData)||this.formattedTime])}})},c194:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743"),n("1a04")},c3a6:function(t,e,n){"use strict";n("68ef"),n("9d70"),n("3743")},c887:function(t,e,n){}}]);
//# sourceMappingURL=chunk-5adbbf6c.4b911ef3.js.map