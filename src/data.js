var _ = require('lodash')
  , list = require('./list')
  , EmptyValue = list.Empty
  , Value = list.Value;

var _data
  , _keys;

var Data = function(data, options) {

  var _data
    , _keys;

  init.call(this);

  this.set = function(key, value) {

    if (typeof value === 'object') {
      value = new Data(value,options);
    }
    if (_data.hasOwnProperty(key)) {
      _data[key].push(value);
    }
    return this;
  };

  this.get = function(key) {

    if (_data.hasOwnProperty(key)) {
      return _data[key].head().value;
    }
    return undefined;
  }

  this.each = function(iterator) {

    for (var key in _data) {
      if(_data.hasOwnProperty(key)) {
        iterator.call(this, key, _data[key]);
      }
    }
    return this;
  }

  this.clone = function(options) {

    var opts = options || {}
      , data;

    if (opts.deep) {
      return new Data(_data);
    }

    this.each(function(key,value) {
      data[key] =  value.head();
    });
    return new Data(data);

  }

  this.append = function(dataObject) {

    if (! dataObject instanceof Data) {
      throw new Error('InvalidType: Only instances of Data can be appended to a Data object');
    }

  }

  /**
  * if this shars a key wiht dataObject perform an append operation
  * else add the key and its list to this.
  */
  this.extend  = function(dataObject) {

    if (! dataObject instanceof Data) {
      throw new Error('InvalidType: Data objects can only be extended by Data objects');
    }
  }

  function init() {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {

        if (data[key] instanceof Value) {
          _data[key] = data[key];

        }
        else {
          _data[key] = new EmptyValue();
          this.set(key, data[key]);
        }
      }
    }
  }
};

Data.prototype.copy = function() {

  var obj = {};

  this.each(function(key,value) {
    obj[key] = (value instanceof Data) ? value.toObject() : value.head().value;
  });

  return obj;
}

module.exports = Data;
