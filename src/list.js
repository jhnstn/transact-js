var _ = require('lodash');


var Value = function(value, next, last) {
  this.value = value;
  this.next = next;
  this.last = last;
  return this;
}

Value.prototype.push = function(value) {
  var node = new Value(value, this, this.last);
  return node;
};


Value.prototype.head = function() {
  return this;
}

var EmptyNode = function() { }
EmptyValue.prototype = new Value();

EmptyValue.prototype.push = function(value) {
  return new Value(value, this, this);
}


module.exports = {
  Value: Value
, Empty : EmptyValue
};
