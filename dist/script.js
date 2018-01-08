'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global Backbone */

Backbone.Model.Base = Backbone.Model.extend({
  attributeTypes: {},

  initialize: function initialize() {},

  set: function set(attrs, opts) {

    // Format arguments to remove variations.
    if (typeof attrs === 'string') {
      attrs = _defineProperty({}, attrs, opts);
      opts = arguments[2] || {};
    }

    // Format attribute values based on attibute types extention property.
    if (this.attributeTypes && _typeof(this.attributeTypes) === 'object') {
      for (var k in this.attributeTypes) {
        if (this.attributeTypes.hasOwnProperty(k) && this.attributeTypes[k] && attrs.hasOwnProperty(k) && attrs[k]) {

          // Format value into array for spread operator when providing
          // arguments to constructors.
          var value = Array.isArray(attrs[k]) ? attrs[k] : [attrs[k]];

          if (typeof this.attributeTypes[k] === 'string') {
            switch (value) {
              case 'boolean':
                attrs[k] = new (Function.prototype.bind.apply(Boolean, [null].concat(_toConsumableArray(value))))().valueOf();
                break;

              case 'number':
                attrs[k] = new (Function.prototype.bind.apply(Number, [null].concat(_toConsumableArray(value))))().valueOf();
                break;

              case 'string':
                attrs[k] = new (Function.prototype.bind.apply(String, [null].concat(_toConsumableArray(value))))().valueOf();
                break;

              case 'function':
                attrs[k] = new (Function.prototype.bind.apply(Function, [null].concat(_toConsumableArray(value))))();
                break;
            }
          } else if (typeof value === 'function') {
            attrs[k] = new (Function.prototype.bind.apply(this.attributeTypes[k], [null].concat(_toConsumableArray(value))))();
          }
        }
      }
    }

    Backbone.Model.prototype.set.call(this, attrs, opts);
  }
});

////////////////////////////////////////////////////////////////////////////////

Backbone.Collection.Base = Backbone.Collection.extend({});

////////////////////////////////////////////////////////////////////////////////

Backbone.View.Base = Backbone.View.extend({});