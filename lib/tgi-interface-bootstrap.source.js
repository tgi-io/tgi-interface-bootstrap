/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap.source.js
 */
/**
 * Constructor
 */
var BootstrapInterface = function (args) {
  if (false === (this instanceof Interface)) throw new Error('new operator required');
  args = args || {};
  args.name = args.name || '(unnamed)';
  args.description = args.description || 'a BootstrapInterface';
  args.vendor = args.vendor || null;
  var i;
  var unusedProperties = getInvalidProperties(args, ['name', 'description', 'vendor']);
  var errorList = [];
  for (i = 0; i < unusedProperties.length; i++) errorList.push('invalid property: ' + unusedProperties[i]);
  if (errorList.length > 1)
    throw new Error('error creating Interface: multiple errors');
  if (errorList.length) throw new Error('error creating Interface: ' + errorList[0]);
  // default state
  this.startCallback = null;
  this.stopCallback = null;
  this.mocks = [];
  this.mockPending = false;
  // args ok, now copy to object
  for (i in args) this[i] = args[i];
};
BootstrapInterface.prototype = Object.create(Interface.prototype);
/**
 * Methods
 */
BootstrapInterface.prototype.canMock = function () {
  return this.vendor ? true : false;
};
BootstrapInterface.prototype.start = function (application, presentation, callBack) {
  if (!(application instanceof Application)) throw new Error('Application required');
  if (!(presentation instanceof Presentation)) throw new Error('presentation required');
  if (typeof callBack != 'function') throw new Error('callBack required');
  this.application = application;
  this.presentation = presentation;
  this.startCallback = callBack;
  if (!this.vendor) throw new Error('Error initializing Bootstrap');
  try {
    if (!BootstrapInterface._bs) {
      BootstrapInterface._bs = new this.vendor();
    }
  } catch (e) {
    throw new Error('Error initializing Bootstrap: ' + e);
  }
  /**
   * Add needed html to DOM
   */
  this.doc = {}; // Keep DOM element IDs here
  this.htmlDialog();
  if (this.presentation.get('contents').length)
    this.htmlNavigation();
};
/**
 * DOM helper
 */
BootstrapInterface.addEle = function (parent, tagName, className, attributes) {
  var ele = document.createElement(tagName);
  if (className && className.length)
    ele.className = className;
  if (attributes)
    for (var i in attributes)
      if (attributes.hasOwnProperty(i)) ele.setAttribute(i, attributes[i]);
  parent.appendChild(ele);
  return ele;
};
