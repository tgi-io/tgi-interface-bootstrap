/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap-queries.source.js
 */
BootstrapInterface.prototype.htmlDialog = function () {
  var bootstrapInterface = this;
  var addEle = BootstrapInterface.addEle;
  var modalDialog, modalContent, modalHeader, modalBody, modalFooter, modalOK, modalCancel, modalYes, modalNo, choice;

  /**
   * ok()
   */
  this.doc.okDialog = addEle(document.body, 'div', 'modal fade', {
    tabindex: '-1',
    role: 'dialog',
    'aria-hidden': true
  });
  modalDialog = addEle(this.doc.okDialog, 'div', 'modal-dialog');
  modalContent = addEle(modalDialog, 'div', 'modal-content');
  modalHeader = addEle(modalContent, 'div', 'modal-header', {style: 'text-align: center'});
  this.doc.okDialogTitle = addEle(modalHeader, 'h4', 'modal-title', {style: 'text-align: center'});
  this.doc.okDialogBody = addEle(modalContent, 'div', 'modal-body', {style: 'text-align: center'});
  modalFooter = addEle(modalContent, 'div', 'modal-footer', {style: 'text-align: center'});
  modalOK = addEle(modalFooter, 'button', 'btn btn-primary');
  modalOK.innerHTML = '&nbsp;&nbsp;OK&nbsp;&nbsp;';
  $(modalOK).on('click', function () {
    $(bootstrapInterface.doc.okDialog).modal('hide');
  });
  $(this.doc.okDialog).on('hidden.bs.modal', function (e) {
    if (bootstrapInterface.okCallBack) {
      var callBack = bootstrapInterface.okCallBack;
      delete bootstrapInterface.okCallBack;
      callBack();
    }
  });
  /**
   * yesno()
   */
  this.doc.yesnoDialog = addEle(document.body, 'div', 'modal fade', {
    tabindex: '-1',
    role: 'dialog',
    'aria-hidden': true
  });
  modalDialog = addEle(this.doc.yesnoDialog, 'div', 'modal-dialog');
  modalContent = addEle(modalDialog, 'div', 'modal-content');
  modalHeader = addEle(modalContent, 'div', 'modal-header', {style: 'text-align: center'});
  this.doc.yesnoDialogTitle = addEle(modalHeader, 'h4', 'modal-title', {style: 'text-align: center'});
  this.doc.yesnoDialogBody = addEle(modalContent, 'div', 'modal-body', {style: 'text-align: center'});
  modalFooter = addEle(modalContent, 'div', 'modal-footer', {style: 'text-align: center'});
  modalYes = addEle(modalFooter, 'button', 'btn btn-success');
  modalYes.innerHTML = '&nbsp;<u>Y</u>es&nbsp;';
  $(modalYes).on('click', function () {
    $(bootstrapInterface.doc.yesnoDialog).modal('hide');
    bootstrapInterface.yesnoResponse = true;
  });
  modalNo = addEle(modalFooter, 'button', 'btn btn-danger');
  modalNo.innerHTML = '&nbsp;<u>N</u>o&nbsp;&nbsp;';
  $(modalNo).on('click', function () {
    $(bootstrapInterface.doc.yesnoDialog).modal('hide');
    bootstrapInterface.yesnoResponse = false;
  });
  $(this.doc.yesnoDialog).on('hidden.bs.modal', function (e) {
    if (bootstrapInterface.yesnoCallBack) {
      var callBack = bootstrapInterface.yesnoCallBack;
      delete bootstrapInterface.yesnoCallBack;
      callBack(bootstrapInterface.yesnoResponse);
    }
  });
  /**
   * ask()
   */
  this.doc.askDialog = addEle(document.body, 'div', 'modal fade', {
    tabindex: '-1',
    role: 'dialog',
    'aria-hidden': true
  });
  modalDialog = addEle(this.doc.askDialog, 'div', 'modal-dialog');
  modalContent = addEle(modalDialog, 'div', 'modal-content');
  modalHeader = addEle(modalContent, 'div', 'modal-header', {style: 'text-align: center'});
  this.doc.askDialogTitle = addEle(modalHeader, 'h4', 'modal-title', {style: 'text-align: center'});
  modalBody = addEle(modalContent, 'div', 'modal-body', {style: 'text-align: center'});
  this.doc.askDialogPrompt = addEle(modalBody, 'div', 'modal-body');
  this.doc.askDialogInput = addEle(modalBody, 'input', 'form-control', {style: 'margin:0 auto; width:80%;'});
  $(this.doc.askDialogInput).keypress(function (e) {
    if (e.which == 13) {
      bootstrapInterface.askResponse = bootstrapInterface.doc.askDialogInput.value;
      $(bootstrapInterface.doc.askDialog).modal('hide');
    }
  });
  modalFooter = addEle(modalContent, 'div', 'modal-footer', {style: 'text-align: center'});
  modalOK = addEle(modalFooter, 'button', 'btn btn-primary');
  modalOK.innerHTML = '&nbsp;&nbsp;OK&nbsp;&nbsp;';
  $(modalOK).on('click', function () {
    bootstrapInterface.askResponse = bootstrapInterface.doc.askDialogInput.value;
    $(bootstrapInterface.doc.askDialog).modal('hide');
  });
  modalCancel = addEle(modalFooter, 'button', 'btn btn-default');
  modalCancel.innerHTML = 'Cancel';
  $(modalCancel).on('click', function () {
    bootstrapInterface.askResponse = undefined;
    $(bootstrapInterface.doc.askDialog).modal('hide');
  });
  $(this.doc.askDialog).on('hidden.bs.modal', function (e) {
    if (bootstrapInterface.askCallBack) {
      var callBack = bootstrapInterface.askCallBack;
      delete bootstrapInterface.askCallBack;
      callBack(bootstrapInterface.askResponse);
    }
  });
  $(this.doc.askDialog).on('shown.bs.modal', function (e) {
    $(bootstrapInterface.doc.askDialog).focus();
    $(bootstrapInterface.doc.askDialogInput).focus();
  });
  /**
   * choose()
   */
  this.doc.chooseDialog = addEle(document.body, 'div', 'modal fade', {
    tabindex: '-1',
    role: 'dialog',
    'aria-hidden': true
  });
  modalDialog = addEle(this.doc.chooseDialog, 'div', 'modal-dialog');
  modalContent = addEle(modalDialog, 'div', 'modal-content');
  modalHeader = addEle(modalContent, 'div', 'modal-header', {style: 'text-align: center'});
  this.doc.chooseDialogTitle = addEle(modalHeader, 'h4', 'modal-title', {style: 'text-align: center'});
  modalBody = addEle(modalContent, 'div', 'modal-body', {style: 'text-align: center'});
  this.doc.chooseDialogPrompt = addEle(modalBody, 'div', 'modal-body', {style: 'text-align: center'});
  this.doc.chooseDialogButtons = [];
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 0;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 1;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 2;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 3;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 4;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 5;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 6;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 7;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  modalFooter = addEle(modalContent, 'div', 'modal-footer', {style: 'text-align: center'});
  modalCancel = addEle(modalFooter, 'button', 'btn btn-default btn-block');
  modalCancel.innerHTML = '<b class="text-danger">Cancel</b>';
  $(modalCancel).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = undefined;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  $(this.doc.chooseDialog).on('hidden.bs.modal', function (e) {
    if (bootstrapInterface.chooseCallBack) {
      var callBack = bootstrapInterface.chooseCallBack;
      delete bootstrapInterface.chooseCallBack;
      callBack(bootstrapInterface.doc.chooseDialogChoices[bootstrapInterface.doc.chooseDialogChoice]);
    }
  });
};

BootstrapInterface.prototype.info = function (text) {
  if (!text || typeof text !== 'string') throw new Error('text required');
  var info = BootstrapInterface.addEle(document.body, 'h4');
  info.innerHTML = '&nbsp;' + text + '<br>';
  console.log('info: ' + text);
};
BootstrapInterface.prototype.ok = function (prompt, callBack) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (typeof callBack != 'function') throw new Error('callBack required');
  if (this.okPending) {
    delete this.okPending;
    callBack();
  } else {
    this.doc.okDialogTitle.innerHTML = this.application.get('brand');
    this.doc.okDialogBody.innerHTML = prompt;
    $(this.doc.okDialog).modal();
    this.okCallBack = callBack;
  }
};
BootstrapInterface.prototype.yesno = function (prompt, callBack) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (typeof callBack != 'function') throw new Error('callBack required');
  if (this.yesnoPending) {
    delete this.yesnoPending;
    callBack(this.yesnoResponse);
  } else {
    this.doc.yesnoDialogTitle.innerHTML = this.application.get('brand');
    this.doc.yesnoDialogBody.innerHTML = prompt;
    $(this.doc.yesnoDialog).modal();
    this.yesnoCallBack = callBack;
  }
};
BootstrapInterface.prototype.ask = function (prompt, attribute, callBack) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (false === (attribute instanceof Attribute)) throw new Error('instance of Attribute a required parameter');
  if (typeof callBack != 'function') throw new Error('callBack required');
  if (this.askPending) {
    delete this.askPending;
    callBack(this.askResponse);
  } else {
    this.doc.askDialogTitle.innerHTML = this.application.get('brand');
    this.doc.askDialogPrompt.innerHTML = prompt + '<br><br>';
    $(this.doc.askDialog).modal();
    this.askCallBack = callBack;
  }
};
BootstrapInterface.prototype.choose = function (prompt, choices, callBack) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (false === (choices instanceof Array)) throw new Error('choices array required');
  if (!choices.length) throw new Error('choices array empty');
  if (typeof callBack != 'function') throw new Error('callBack required');
  if (this.choosePending) {
    delete this.choosePending;
    callBack(Interface.firstMatch(this.chooseResponse, choices));
  } else {
    if (choices.length > this.doc.chooseDialogButtons.length) throw new Error('max choices reached in choose');
    this.doc.chooseDialogTitle.innerHTML = this.application.get('brand');
    this.doc.chooseDialogPrompt.innerHTML = prompt.replace(/\n/g, '<br>');
    $(this.doc.chooseDialog).modal();
    this.chooseCallBack = callBack;
    this.doc.chooseDialogChoices = choices;
    for (var i = 0; i < this.doc.chooseDialogButtons.length; i++) {
      if (i < choices.length) {
        this.doc.chooseDialogButtons[i].innerHTML = '<b class="text-primary">' + choices[i] + '</b>';
        $(this.doc.chooseDialogButtons[i]).show();
      } else {
        $(this.doc.chooseDialogButtons[i]).hide();
      }
    }
  }
  /**
   * Since framework does not return any info in callback
   */
  function cbCancel() {
    callBack();
  }

  function cb0() {
    callBack(choices[0]);
  }

  function cb1() {
    callBack(choices[1]);
  }

  function cb2() {
    callBack(choices[2]);
  }

  function cb3() {
    callBack(choices[3]);
  }

  function cb4() {
    callBack(choices[4]);
  }

  function cb5() {
    callBack(choices[5]);
  }

  function cb6() {
    callBack(choices[6]);
  }

  function cb7() {
    callBack(choices[7]);
  }

  function cb8() {
    callBack(choices[8]);
  }

  function cb9() {
    callBack(choices[9]);
  }
};
