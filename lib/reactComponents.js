'use strict';
var React = require('react');
var invariant = require('react/lib/invariant');

var EL = require('./markdownElements');
var between = function between(n, lower, upper) {
  return typeof n === 'number' && n > lower && n < upper;
};

var Header = React.createClass({
  displayName: 'Header',

  render: function render() {
    var level = this.props.component.level;
    invariant(between(level, 0, 6), 'You attempted to create a header with a level of `%s`. ' + 'A header must be in the range 1..6');

    var values = this.props.builder.buildValues(this.props.component.values);
    var element = 'h' + level;

    return React.createElement(element, null, values);
  }
});

var Link = React.createClass({
  displayName: 'Link',

  render: function render() {
    var link;
    if (this.props.component.href) {
      link = this.props.component.href;
    } else {
      if (this.props.builder.references && this.props.builder.references.hasOwnProperty(this.props.component.ref)) {
        link = this.props.builder.references[this.props.component.ref].href;
      } else {
        link = '';
      }
    }
    var values = this.props.builder.buildValues(this.props.component.values);

    return React.createElement(
      'a',
      { href: link },
      values
    );
  }
});

var Image = React.createClass({
  displayName: 'Image',

  render: function render() {
    return React.createElement('img', { alt: this.props.component.alt, src: this.props.component.href });
  }
});

function createReactClass(element) {
  return React.createClass({
    render: function render() {
      var values = this.props.builder.buildValues(this.props.component.values);
      return React.createElement(element, null, values);
    }
  });
}

exports[EL.BLOCKQUOTE] = createReactClass('blockquote');
exports[EL.BULLETLIST] = createReactClass('ul');
exports[EL.EM] = createReactClass('em');
exports[EL.HEADER] = Header;
exports[EL.IMAGE] = Image;
exports[EL.INLINECODE] = createReactClass('code');
exports[EL.LISTITEM] = createReactClass('li');
exports[EL.LINK] = Link;
exports[EL.LINKREF] = Link;
exports[EL.NUMBERLIST] = createReactClass('ol');
exports[EL.PARA] = createReactClass('p');
exports[EL.SECTION] = createReactClass('section');
exports[EL.STRONG] = createReactClass('strong');
exports[EL.HR] = createReactClass('hr');