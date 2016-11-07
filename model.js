(function() {
  'use strict';

  function createProduct () {
    // Product from user input
    var product = new Product({
      Name: "Ian",
      Description: "Buying below",
      Length: 1,
      Height: 1,
      Weight: 1,
      Value: 3.00       // FIXME: Display dollar value properly
    }, {});
    console.log(product.get("Name"));
    console.log(product.get("Value"));
    return product;
  }

  var Product = FW.Model.extend('Product', {
    init: function (info, options) {
      Product.parent.init.call(this, options);
      this._setAttr(info);
      this.listenTo(this, 'change', this._onChange);
    },
    _onChange: function() {
      // TODO: Notify view model change
    },
    _setAttr: function(info, self) {
      // self = self || this;
      _.each(info, function(val, attr) {
        this.set(attr, val);
      }.bind(this));
    }
  });

  createProduct();
}());
