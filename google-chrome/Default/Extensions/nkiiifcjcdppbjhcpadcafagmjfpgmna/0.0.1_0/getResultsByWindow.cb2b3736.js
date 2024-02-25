var e,t;"function"==typeof(e=globalThis.define)&&(t=e,e=null),// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(t,r,n,o,u){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof a[o]&&a[o],i=l.cache||{},c="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(e,r){if(!i[e]){if(!t[e]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var n="function"==typeof a[o]&&a[o];if(!r&&n)return n(e,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(l)return l(e,!0);// Try the node require function if it exists.
if(c&&"string"==typeof e)return c(e);var u=Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}f.resolve=function(r){var n=t[e][1][r];return null!=n?n:r},f.cache={};var d=i[e]=new s.Module(e);t[e][0].call(d.exports,f,d,d.exports,this)}return i[e].exports;function f(e){var t=f.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=t,s.cache=i,s.parent=l,s.register=function(e,r){t[e]=[function(e,t){t.exports=r},{}]},Object.defineProperty(s,"root",{get:function(){return a[o]}}),a[o]=s;for(var d=0;d<r.length;d++)s(r[d]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var f=s(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=f:"function"==typeof e&&e.amd?e(function(){return f}):u&&(this[u]=f)}}({a7lme:[function(e,t,r){// @ts-nocheck
var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"config",()=>a);let o=e=>{// Source
// https://stackoverflow.com/a/9636008/1922857
document.dispatchEvent(new CustomEvent("com.webapptechstack.extension.getResultsByWindow",{detail:e}))},u=[()=>!!window.React&&["React.js"],()=>!!document.querySelector("[data-reactroot], [data-reactid]")&&["React.js"],/*
    This works for CRA
    https://stackoverflow.com/a/73469827/1922857

    And works for Next.js
      [div#__next]
      Object.keys(temp1)
      (2) ['__reactContainer$gdne8cvhl6', '_reactListening5sydpbs6je5']
   */()=>Array.from(document.querySelectorAll("*")).some(e=>void 0!==e._reactRootContainer||Object.keys(e).some(e=>e.startsWith("__reactContainer")))&&["React.js"],()=>!!window.Vue&&["Vue.js"],// https://stackoverflow.com/a/58500685/1922857
()=>Array.from(document.querySelectorAll("*")).some(e=>void 0!==e.__vue__||void 0!==e.__vue_app__)&&["Vue.js"],()=>!!document.querySelector("[data-vue-ssr-id]")&&["Vue.js SSR"],()=>!!window.angular&&["Angular.js"],()=>!!document.querySelector(".ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]")&&["Angular.js"],()=>!!document.querySelector('script[src*="angular.js"], script[src*="angular.min.js"]')&&["Angular.js"],()=>!!window.getAllAngularRootElements&&["Angular.js"],()=>!!window.ng?.coreTokens?.NgZone&&["Angular.js"],()=>!!document.querySelector("script[id=__NEXT_DATA__]")&&["Next.js"],()=>!!document.querySelector("[id=___gatsby]")&&["Gatsby.js"],()=>!!window.Backbone&&["Backbone.js"],()=>!!window.Ember&&["Ember.js"],()=>!!window.Meteor&&["Meteor.js"],()=>!!window.Zepto&&["Zepto.js"],()=>!!window.jQuery&&["jQuery.js"]];try{for(let e of u){let t=e();Array.isArray(t)&&t.length&&o(t)}}catch(e){return console.warn(e),[]}let a={matches:["<all_urls>"],world:"MAIN"}},{"@parcel/transformer-js/src/esmodule-helpers.js":"hbR2Q"}],hbR2Q:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["a7lme"],"a7lme","parcelRequire0025"),globalThis.define=t;