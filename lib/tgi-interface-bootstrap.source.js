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
  this.startcallback = null;
  this.stopcallback = null;
  this.mocks = [];
  this.mockPending = false;
  this.doc = {}; // Keep DOM element IDs here
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
BootstrapInterface.prototype.start = function (application, presentation, callback) {
  if (!(application instanceof Application)) throw new Error('Application required');
  if (!(presentation instanceof Presentation)) throw new Error('presentation required');
  if (typeof callback != 'function') throw new Error('callback required');
  this.application = application;
  this.presentation = presentation;
  this.startcallback = callback;
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
  this.htmlPanels();
  this.htmlDialog();
  if (this.presentation.get('contents').length)
    this.htmlNavigation();
};
BootstrapInterface.prototype.dispatch = function (request, response) {
  if (false === (request instanceof Request)) throw new Error('Request required');
  if (response && typeof response != 'function') throw new Error('response callback is not a function');
  var requestHandled = false;
  try {
    if (this.application) {
      if (request.type == 'Command' && request.command.type == 'Presentation') {
        this.activatePanel(request.command);
        requestHandled = true;
      } else {
        requestHandled = this.application.dispatch(request);
      }
    }
    if (!requestHandled && this.startcallback) {
      this.startcallback(request);
    }
  } catch (e) {
    if (this.startcallback) {
      this.startcallback(e);
    }
  }
};
BootstrapInterface.prototype.render = function (command, callback) {
  if (false === (command instanceof Command)) throw new Error('Command object required');
  this.activatePanel(command);
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
BootstrapInterface.addTopEle = function (parent, tagName, className, attributes) {
  var ele = document.createElement(tagName);
  if (className && className.length)
    ele.className = className;
  if (attributes)
    for (var i in attributes)
      if (attributes.hasOwnProperty(i)) ele.setAttribute(i, attributes[i]);
  if (parent.firstChild)
    parent.insertBefore(ele, parent.firstChild);
  else
    parent.appendChild(ele);
  return ele;
};
