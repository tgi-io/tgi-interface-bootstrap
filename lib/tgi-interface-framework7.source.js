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
//BootstrapInterface.prototype.canMock = function () {
//  return this.vendor ? true : false;
//};
//BootstrapInterface.prototype.start = function (application, presentation, callBack) {
//  if (!(application instanceof Application)) throw new Error('Application required');
//  if (!(presentation instanceof Presentation)) throw new Error('presentation required');
//  if (typeof callBack != 'function') throw new Error('callBack required');
//  this.application = application;
//  this.presentation = presentation;
//  this.startCallback = callBack;
//  if (!this.vendor) throw new Error('Error initializing Bootstrap');
//  try {
//    if (!BootstrapInterface._f7) {
//      BootstrapInterface._f7 = new this.vendor();
//    }
//  } catch (e) {
//    throw new Error('Error initializing Bootstrap: ' + e);
//  }
//};
//BootstrapInterface.prototype.info = function (text) {
//  if (!text || typeof text !== 'string') throw new Error('text required');
//  BootstrapInterface._f7.addNotification({title: this.application.get('brand'), message: text, hold:3000});
//};
//BootstrapInterface.prototype.ok = function (prompt, callBack) {
//  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
//  if (typeof callBack != 'function') throw new Error('callBack required');
//  if (this.okPending) {
//    delete this.okPending;
//    callBack();
//  } else {
//    BootstrapInterface._f7.alert(prompt.replace(/\n/g,'<br>'), this.application.get('brand'), function () {
//      callBack();
//    });
//    //this.okCallBack = callBack;
//  }
//};
//BootstrapInterface.prototype.yesno = function (prompt, callBack) {
//  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
//  if (typeof callBack != 'function') throw new Error('callBack required');
//  if (this.yesnoPending) {
//    delete this.yesnoPending;
//    callBack(this.yesnoResponse);
//  } else {
//    BootstrapInterface._f7.modal({
//      text:prompt.replace(/\n/g,'<br>'),
//      title: this.application.get('brand'),
//      verticalButtons: true,
//      buttons: [{
//        text: 'Yes',
//        onClick: function () {
//          callBack(true);
//        }
//      },{
//        text: 'No',
//        onClick: function () {
//          callBack(false);
//        }
//      }]
//    });
//    //this.yesnoCallBack = callBack;
//  }
//};
//BootstrapInterface.prototype.ask = function (prompt, attribute, callBack) {
//  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
//  if (false === (attribute instanceof Attribute)) throw new Error('instance of Attribute a required parameter');
//  if (typeof callBack != 'function') throw new Error('callBack required');
//  if (this.askPending) {
//    delete this.askPending;
//    callBack(this.askResponse);
//  } else {
//    BootstrapInterface._f7.prompt(prompt.replace(/\n/g,'<br>'), this.application.get('brand'),
//      function (answer) {
//        callBack(answer);
//      },
//      function () {
//        callBack();
//      }
//    );
//    //this.askCallBack = callBack;
//  }
//};
//BootstrapInterface.prototype.choose = function (prompt, choices, callBack) {
//  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
//  if (false === (choices instanceof Array)) throw new Error('choices array required');
//  if (!choices.length) throw new Error('choices array empty');
//  if (typeof callBack != 'function') throw new Error('callBack required');
//  if (this.choosePending) {
//    delete this.choosePending;
//    callBack(Interface.firstMatch(this.chooseResponse, choices));
//  } else {
//
//    var groups = [];
//    groups.push([{text: prompt.replace(/\n/g,'<br>'), label: true}]);
//    if (choices.length > 0) groups.push([{text: choices[0], onClick: cb0}]);
//    if (choices.length > 1) groups.push([{text: choices[1], onClick: cb1}]);
//    if (choices.length > 2) groups.push([{text: choices[2], onClick: cb2}]);
//    if (choices.length > 3) groups.push([{text: choices[3], onClick: cb3}]);
//    if (choices.length > 4) groups.push([{text: choices[4], onClick: cb4}]);
//    if (choices.length > 5) groups.push([{text: choices[5], onClick: cb5}]);
//    if (choices.length > 6) groups.push([{text: choices[6], onClick: cb6}]);
//    if (choices.length > 7) groups.push([{text: choices[7], onClick: cb7}]);
//    if (choices.length > 8) groups.push([{text: choices[8], onClick: cb8}]);
//    if (choices.length > 9) groups.push([{text: choices[9], onClick: cb9}]);
//    if (choices.length > 10) throw new Error('max choices reached in choose');
//    groups.push([{text: 'Cancel', color: 'red', onClick: cbCancel}]);
//
//    BootstrapInterface._f7.actions(groups);
//
//    //this.chooseCallBack = callBack;
//    //this.chooseChoices = choices;
//  }
//  /**
//   * Since framework does not return any info in callback
//   */
//  function cbCancel() {
//    callBack();
//  }
//
//  function cb0() {
//    callBack(choices[0]);
//  }
//
//  function cb1() {
//    callBack(choices[1]);
//  }
//
//  function cb2() {
//    callBack(choices[2]);
//  }
//
//  function cb3() {
//    callBack(choices[3]);
//  }
//
//  function cb4() {
//    callBack(choices[4]);
//  }
//
//  function cb5() {
//    callBack(choices[5]);
//  }
//
//  function cb6() {
//    callBack(choices[6]);
//  }
//
//  function cb7() {
//    callBack(choices[7]);
//  }
//
//  function cb8() {
//    callBack(choices[8]);
//  }
//
//  function cb9() {
//    callBack(choices[9]);
//  }
//};