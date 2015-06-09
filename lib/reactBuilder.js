'use strict';

var React = require('react');

function ReactBuilder(elements) {
  this.elements = elements;
}

ReactBuilder.prototype.build = function (top) {
  this.references = top.references;
  return this.buildElement(top.section);
};

ReactBuilder.prototype.buildElement = function (component) {
  // First return the easy cases;
  if (typeof component === 'undefined') {
    return React.createElement(
      'div',
      null,
      'UNDEFINED'
    );
  }

  if (typeof component === 'string') {
    return component;
  } else if (Array.isArray(component) && Array.length === 1) {
    return component[0];
  }

  var TheElement = this.elements[component.id];
  if (!TheElement) {
    return React.createElement(
      'div',
      null,
      'NOOOO'
    );
  }
  // monkey punch, amirite?
  if (typeof TheElement === 'function') {
    return React.createElement(TheElement, { component: component, builder: this });
  }

  return React.createElement(TheElement, { component: component, builder: this });
};

ReactBuilder.prototype.buildValues = function (values) {
  var _this = this;

  return Array.isArray(values) ? values.map(function (item) {
    return _this.buildElement(item);
  }) : this.buildElement(values);
};

exports.ReactBuilder = ReactBuilder;