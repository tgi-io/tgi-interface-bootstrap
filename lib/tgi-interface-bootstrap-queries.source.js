/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap-queries.source.js
 */

/**
 * Called at startup for initial html
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
    if (bootstrapInterface.okcallback) {
      var callback = bootstrapInterface.okcallback;
      delete bootstrapInterface.okcallback;
      callback();
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
    if (bootstrapInterface.yesnocallback) {
      var callback = bootstrapInterface.yesnocallback;
      delete bootstrapInterface.yesnocallback;
      callback(bootstrapInterface.yesnoResponse);
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
    if (bootstrapInterface.askcallback) {
      var callback = bootstrapInterface.askcallback;
      delete bootstrapInterface.askcallback;
      callback(bootstrapInterface.askResponse);
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
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 8;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 9;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 10;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 11;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 12;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 13;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 14;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 15;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 16;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 17;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 18;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 19;
    $(bootstrapInterface.doc.chooseDialog).modal('hide');
  });
  this.doc.chooseDialogButtons.push(choice);
  choice = addEle(modalBody, 'button', 'btn btn-default btn-block');
  $(choice).on('click', function () {
    bootstrapInterface.doc.chooseDialogChoice = 20;
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
    if (bootstrapInterface.choosecallback) {
      var callback = bootstrapInterface.choosecallback;
      delete bootstrapInterface.choosecallback;
      callback(bootstrapInterface.doc.chooseDialogChoices[bootstrapInterface.doc.chooseDialogChoice]);
    }
  });
};
BootstrapInterface.prototype.info = function (text) {
  var self = this;
  var notify = $.notify(
    {
      /**
       * options
       */
      icon: 'glyphicon glyphicon-info-sign',
      title: 'Information',
      message: text,
      //url: 'https://github.com/mouse0270/bootstrap-notify',
      //target: '_blank'
    },
    {
      /**
       * settings
       */
      element: 'body',
      position: null,
      type: "info",
      allow_dismiss: true,
      newest_on_top: true,
      placement: {
        from: "top",
        align: "right"
      },
      offset: {
        x: 20,
        y: self.doc.navBarHeader.offsetHeight + 20
      },
      spacing: 10,
      z_index: 1031,
      delay: 0,
      timer: 1000,
      //url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-6 alert alert-notify alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      '<h4>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span>' +
      '</h4>' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
        //'<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    }
  );
  setTimeout(function () {
    notify.close();
  }, 3000);
};
BootstrapInterface.prototype.done = function (text) {
  var self = this;
  var notify = $.notify(
    {
      /**
       * options
       */
      icon: 'glyphicon glyphicon-saved',
      title: 'Done',
      message: text
      //url: 'https://github.com/mouse0270/bootstrap-notify',
      //target: '_blank'
    },
    {
      /**
       * settings
       */
      element: 'body',
      position: null,
      type: "success",
      allow_dismiss: true,
      newest_on_top: true,
      placement: {
        from: "top",
        align: "right"
      },
      offset: {
        x: 20,
        y: self.doc.navBarHeader.offsetHeight + 20
      },
      spacing: 10,
      z_index: 1031,
      delay: 0,
      timer: 1000,
      //url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-6 alert alert-notify alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      '<h4>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span>' +
      '</h4>' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
        //'<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    }
  );
  setTimeout(function () {
    notify.close();
  }, 3000);
};
BootstrapInterface.prototype.warn = function (text) {
  var self = this;
  var notify = $.notify(
    {
      /**
       * options
       */
      icon: 'glyphicon glyphicon-exclamation-sign',
      title: 'Warning',
      message: text,
      //url: 'https://github.com/mouse0270/bootstrap-notify',
      //target: '_blank'
    },
    {
      /**
       * settings
       */
      element: 'body',
      position: null,
      type: "warning",
      allow_dismiss: true,
      newest_on_top: true,
      placement: {
        from: "top",
        align: "right"
      },
      offset: {
        x: 20,
        y: self.doc.navBarHeader.offsetHeight + 20
      },
      spacing: 10,
      z_index: 1031,
      delay: 0,
      timer: 1000,
      //url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-6 alert alert-notify alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      '<h4>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span>' +
      '</h4>' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
        //'<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    }
  );
  setTimeout(function () {
    notify.close();
  }, 3000);
};
BootstrapInterface.prototype.err = function (text) {
  var self = this;
  var notify = $.notify(
    {
      /**
       * options
       */
      icon: 'glyphicon glyphicon-warning-sign',
      title: 'Error',
      message: text,
      //url: 'https://github.com/mouse0270/bootstrap-notify',
      //target: '_blank'
    },
    {
      /**
       * settings
       */
      element: 'body',
      position: null,
      type: "danger",
      allow_dismiss: true,
      newest_on_top: true,
      placement: {
        from: "top",
        align: "right"
      },
      offset: {
        x: 20,
        y: self.doc.navBarHeader.offsetHeight + 20
      },
      spacing: 10,
      z_index: 1031,
      delay: 0,
      timer: 1000,
      //url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-6 alert alert-notify alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      '<h4>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span>' +
      '</h4>' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
        //'<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    }
  );
  setTimeout(function () {
    notify.close();
  }, 3000);
};
BootstrapInterface.prototype.ok = function (prompt, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.okPending) {
    delete this.okPending;
    callback();
  } else {
    this.doc.okDialogTitle.innerHTML = this.application ? this.application.get('brand') : '?';
    this.doc.okDialogBody.innerHTML = prompt;
    $(this.doc.okDialog).modal();
    this.okcallback = callback;
  }
};
BootstrapInterface.prototype.yesno = function (prompt, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.yesnoPending) {
    delete this.yesnoPending;
    callback(this.yesnoResponse);
  } else {
    this.doc.yesnoDialogTitle.innerHTML = this.application.get('brand');
    this.doc.yesnoDialogBody.innerHTML = prompt;
    $(this.doc.yesnoDialog).modal();
    this.yesnocallback = callback;
  }
};
BootstrapInterface.prototype.ask = function (prompt, attribute, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (false === (attribute instanceof Attribute)) throw new Error('attribute or callback expected');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.askPending) {
    delete this.askPending;
    callback(this.askResponse);
  } else {
    this.doc.askDialogTitle.innerHTML = this.application.get('brand');
    this.doc.askDialogPrompt.innerHTML = prompt + '<br><br>';
    this.doc.askDialogInput.value = attribute.value;
    $(this.doc.askDialog).modal();
    this.askcallback = callback;
  }
};
BootstrapInterface.prototype.choose = function (prompt, choices, callback) {
  if (!prompt || typeof prompt !== 'string') throw new Error('prompt required');
  if (false === (choices instanceof Array)) throw new Error('choices array required');
  if (!choices.length) throw new Error('choices array empty');
  if (typeof callback != 'function') throw new Error('callback required');
  if (this.choosePending) {
    delete this.choosePending;
    callback(Interface.firstMatch(this.chooseResponse, choices));
  } else {
    if (choices.length > this.doc.chooseDialogButtons.length) throw new Error('max choices reached in choose');
    this.doc.chooseDialogTitle.innerHTML = this.application.get('brand');
    this.doc.chooseDialogPrompt.innerHTML = prompt.replace(/\n/g, '<br>');
    $(this.doc.chooseDialog).modal();
    this.choosecallback = callback;
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
    callback();
  }

  function cb0() {
    callback(choices[0]);
  }

  function cb1() {
    callback(choices[1]);
  }

  function cb2() {
    callback(choices[2]);
  }

  function cb3() {
    callback(choices[3]);
  }

  function cb4() {
    callback(choices[4]);
  }

  function cb5() {
    callback(choices[5]);
  }

  function cb6() {
    callback(choices[6]);
  }

  function cb7() {
    callback(choices[7]);
  }

  function cb8() {
    callback(choices[8]);
  }

  function cb9() {
    callback(choices[9]);
  }
};
