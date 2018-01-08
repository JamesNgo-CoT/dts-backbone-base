/* global Backbone */

Backbone.Model.Base = Backbone.Model.extend({
  attributeTypes: {},

  initialize: function() {},

  set: function(attrs, opts) {
    if (typeof attrs === 'string') {
      attrs = {
        [attrs]: opts
      }
      opts = arguments[2] || {}
    }

    if (this.attributeTypes && typeof this.attributeTypes === 'object') {
      for (const k in this.attributeTypes) {
        if (this.attributeTypes.hasOwnProperty(k) && this.attributeTypes[k]
          && attrs.hasOwnProperty(k) && attrs[k]) {

          const value = Array.isArray(attrs[k]) ? attrs[k] : [attrs[k]]

          if (typeof this.attributeTypes[k] === 'string') {
            switch (value) {
              case 'boolean':
              attrs[k] = new Boolean(...value).valueOf()
              break

              case 'number':
              attrs[k] = new Number(...value).valueOf()
              break

              case 'string':
              attrs[k] = new String(...value).valueOf()
              break

              case 'function':
              attrs[k] = new Function(...value)
              break
            }
          } else if(typeof value === 'function') {
            attrs[k] = new this.attributeTypes[k](...value)
          }
        }
      }
    }

    Backbone.Model.prototype.set.call(this, attrs, opts)
  }
})

////////////////////////////////////////////////////////////////////////////////

Backbone.View.Base = Backbone.View.extend({})

////////////////////////////////////////////////////////////////////////////////

Backbone.Controller.Base = Backbone.Controller.extend({})
