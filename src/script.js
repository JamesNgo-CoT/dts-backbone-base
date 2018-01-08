/* global Backbone */

Backbone.Model.Base = Backbone.Model.extend({
  attributeTypes: {},

  set: function(attrs, opts) {

    // Format arguments to remove variations.
    if (typeof attrs === 'string') {
      attrs = {
        [attrs]: opts
      }
      opts = arguments[2] || {}
    }

    // Format attribute values based on attibute types extention property.
    if (this.attributeTypes && typeof this.attributeTypes === 'object') {
      for (const k in this.attributeTypes) {
        if (this.attributeTypes.hasOwnProperty(k) && this.attributeTypes[k]
          && attrs.hasOwnProperty(k) && attrs[k]) {

          // Format value into array for spread operator when providing
          // arguments to constructors.
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

Backbone.Collection.Base = Backbone.Collection.extend({})

////////////////////////////////////////////////////////////////////////////////

Backbone.View.Base = Backbone.View.extend({})
