/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap-panels.source.js
 */

/**
 * Called at startup for initial html
 */
BootstrapInterface.prototype.htmlPanels = function () {
  var bootstrapInterface = this;
  var addEle = BootstrapInterface.addEle;

  /**
   * Main container and row for panels
   */
  this.doc.mainContainer = addEle(document.body, 'div', 'container main-container', {role: 'main'});
  this.doc.panelRow = addEle(this.doc.mainContainer, 'div', 'row');
};

/**
 * activatePanel will create if needed, make panel visible and render contents
 */
BootstrapInterface.prototype.activatePanel = function (command) {
  var bootstrapInterface = this;
  var addEle = BootstrapInterface.addEle;
  var addTopEle = BootstrapInterface.addTopEle;
  var presentation = command.contents;
  var name = presentation.get('name') || command.name;
  var theme = command.theme || 'default';
  var icon = command.icon;
  if (icon) {
    if (left(icon, 2) == 'fa')
      icon = '<i class="fa ' + icon + '"></i>&nbsp;';
    else
      icon = '<span class="glyphicon ' + icon + '"></span>&nbsp;';
  }
  var title = icon ? icon + name : name;

  /**
   * this.panels array of panels
   */
  if (typeof this.panels == 'undefined')
    this.panels = [];

  /**
   * See if command already has a panel
   */
  var panel;
  for (var i = 0; (typeof panel == 'undefined') && i < this.panels.length; i++) {
    if (name == this.panels[i].name)
      panel = this.panels[i];
  }

  /**
   * If we did not find panel create
   */
  if (typeof panel == 'undefined') {
    panel = {
      name: name,
      listeners: []
    };
    this.panels.push(panel);

    /**
     * Main framing and title text
     */
    panel.panelDiv = addTopEle(this.doc.panelRow, 'div', 'panel panel-' + theme, {draggable: 'true'});
    panel.panelHeading = addEle(panel.panelDiv, 'div', 'panel-heading');
    panel.panelTitle = addEle(panel.panelHeading, 'div', 'panel-title');
    panel.panelTitleText = addEle(panel.panelTitle, 'a', 'panel-title-text', {href: '#'});
    panel.panelTitleText.innerHTML = title;

    /**
     * Close Panel Button
     */
    panel.panelClose = addEle(panel.panelTitle, 'a', undefined, {href: '#'});
    panel.panelClose.innerHTML = '<span class="glyphicon glyphicon-remove panel-glyph-right pull-right text-muted"></span>';
    $(panel.panelClose).click(function (e) {
      $(panel.panelClose).off(); // kill listener
      for (var i = 0; i < bootstrapInterface.panels.length; i++) {
        if (panel == bootstrapInterface.panels[i])
          bootstrapInterface.panels.splice(i, 1);
      }
      bootstrapInterface.doc.panelRow.removeChild(panel.panelDiv);
      panel = undefined; // delete dom refs
      e.preventDefault();
    });

    /**
     * Hide Panel Button
     */
    panel.panelHide = addEle(panel.panelTitle, 'a', undefined, {href: '#'});
    panel.panelHide.innerHTML = '<span class="glyphicon glyphicon-chevron-down panel-glyph-right pull-right text-muted"></span>';
    $(panel.panelHide).click(function (e) {
      $(panel.panelBody).hide('fast');
      $(panel.panelHide).hide();
      $(panel.panelShow).show();
      e.preventDefault();
    });

    /**
     * Show Panel Button
     */
    panel.panelShow = addEle(panel.panelTitle, 'a', undefined, {href: '#'});
    panel.panelShow.innerHTML = '<span class="glyphicon glyphicon-chevron-left panel-glyph-right pull-right text-muted"></span>';
    $(panel.panelShow).hide();
    $(panel.panelShow).click(function (e) {
      $(panel.panelBody).show('fast');
      $(panel.panelHide).show();
      $(panel.panelShow).hide();
      e.preventDefault();
    });

    panel.panelBody = addEle(panel.panelDiv, 'div', 'panel-body bg-' + theme);
    panel.panelWell = addEle(panel.panelBody, 'div', 'well-panel');
    panel.panelForm = addEle(panel.panelWell, 'form', 'form-horizontal');

  }

  /**
   * Remove listeners before deleting -- todo WTF ?
   */
  for (i = 0; i < panel.listeners.length; i++) {
    var ele = panel.listeners[i];
    $(ele).off();
  }
  panel.buttonDiv = undefined; // WTF ends HERE!!!!!!!!!!!

  /**
   * Render panel body based on presentation mode
   */
  switch (command.presentationMode) {
    case 'View': // todo edit/view wacked (says view renders edit ???)
      bootstrapInterface.renderPanelBodyView(panel, command);
      $(panel.panelBody).show('fast'); //
      $(panel.panelHide).show();
      $(panel.panelShow).hide();
      $('html, body').animate({
        scrollTop: $(panel.panelDiv).offset().top - $(bootstrapInterface.doc.navBar).height() - 8
      }, 250);
      break;
    default:
      bootstrapInterface.info('unknown command.presentationMode: ' + command.presentationMode);
  }
};

/**
 * renderPanelBodyView will insert the html into the body of the panel for View presentation mode
 */
BootstrapInterface.prototype.renderPanelBodyView = function (panel, command) {
  var bootstrapInterface = this;
  var addEle = BootstrapInterface.addEle;
  var i, j;
  var contents = command.contents.get('contents');
  panel.panelForm.innerHTML = '';
  for (i = 0; i < contents.length; i++) {
    // String markdown or separator '-'
    if (typeof contents[i] == 'string') {
      if (contents[i] == '-') {
        panel.panelForm.appendChild(document.createElement("hr"));
      } else {
        var txtDiv = document.createElement("div");
        txtDiv.innerHTML = marked(contents[i]);
        panel.panelForm.appendChild(txtDiv);
      }
    }
    if (contents[i] instanceof Attribute) renderAttribute(contents[i]);
    if (contents[i] instanceof List) renderList(contents[i],command.theme);
    if (contents[i] instanceof Command) renderCommand(contents[i]);
  }
  /**
   * function to render Attribute
   */
  function renderAttribute(attribute) {

    var daList;
    var daItems;
    var formGroup;
    var label;
    var inputDiv;
    var input;
    var helpTextDiv;
    var sz;
    var button;
    var select;
    var textNode;
    var inputGroupDiv;
    var inputGroupSpan;
    var inputGroupButton;
    var inputGroupDropDownMenu;
    var initSwitchery;
    var items;
    var j;


    /**
     * Create formGroup container and label
     */

    formGroup = addEle(panel.panelForm, 'div', 'form-group');
    addEle(formGroup, 'label', 'col-sm-3 control-label').innerHTML = attribute.label;

    /**
     * Create inputDiv - set with of input based on size of field
     */
    sz = '1';
    if (attribute.size > 2) sz = '2';
    if (attribute.size > 5) sz = '3';
    if (attribute.size > 10) sz = '4';
    if (attribute.size > 20) sz = '5';
    if (attribute.size > 25) sz = '6';
    if (attribute.size > 30) sz = '7';
    if (attribute.size > 40) sz = '8';
    if (attribute.size > 50) sz = '9';
    if (attribute.type == 'Number') sz = '3';
    if (attribute.type == 'Date') sz = '3';
    if (attribute.type == 'Boolean') sz = '3';
    inputDiv = addEle(formGroup, 'div', 'col-sm-' + sz);

    /**
     * Render based on type
     */
    switch (attribute.type) {
      case 'Boolean':
        input = addEle(inputDiv, 'input', 'js-switch');
        input.setAttribute("type", "checkbox");
        if (attribute.value)
          input.setAttribute("checked", "true");
        initSwitchery = new Switchery(input, // todo events inside switchery may cause leakage when panels closed
          {
            color: window.getComputedStyle(panel.panelTitle, null).getPropertyValue('color'),
            secondaryColor: '#dfdfdf',
            className: 'switchery',
            disabled: false,
            disabledOpacity: 0.5,
            speed: '0.1s'
          });
        break;

      case 'Date':
        inputGroupDiv = addEle(inputDiv, 'div', 'input-group date');

        input = addEle(inputGroupDiv, 'input', 'form-control');
        if (attribute.placeHolder)
          input.setAttribute("placeHolder", attribute.placeHolder);
        input.setAttribute("type", "Date");
        input.setAttribute("maxlength", attribute.size);
        if (attribute.value)
          input.value = (1 + attribute.value.getMonth()) + '/' + attribute.value.getDate() + '/' + attribute.value.getFullYear();

        inputGroupSpan = addEle(inputGroupDiv, 'span', 'input-group-addon');
        inputGroupSpan.innerHTML = '<i class="fa fa-calendar"></i>';
        $(inputGroupDiv).datepicker({autoclose: true, todayBtn: true, todayHighlight: true, showOnFocus: false});
        panel.listeners.push(inputGroupDiv); // so we can avoid leakage on deleting panel
        break;

      case 'Number':
        input = addEle(inputDiv, 'input', 'form-control');
        if (attribute.placeHolder)
          input.setAttribute("placeHolder", attribute.placeHolder);
        input.setAttribute("type", "number");
        input.setAttribute("maxlength", attribute.size);
        if (attribute.value)
          input.setAttribute("value", attribute.value);
        break;

      default: // String
        if (attribute.quickPick) {
          inputGroupDiv = addEle(inputDiv, 'div', 'input-group');
          input = addEle(inputGroupDiv, 'input', 'form-control');
        } else {
          input = addEle(inputDiv, 'input', 'form-control');
        }
        if (attribute.placeHolder)
          input.setAttribute("placeHolder", attribute.placeHolder);
        input.setAttribute("type", attribute.hint.password ? "password" : "text");
        input.setAttribute("maxlength", attribute.size);
        if (attribute.value)
          input.setAttribute("value", attribute.value);
        if (attribute.quickPick) {

          inputGroupSpan = addEle(inputGroupDiv, 'span', 'input-group-btn');

          inputGroupButton = addEle(inputGroupSpan, 'button', 'btn btn-default dropdown-toggle');
          inputGroupButton.type = 'button';
          inputGroupButton.setAttribute('data-toggle', 'dropdown');
          inputGroupButton.innerHTML = '<span class="caret"></span>';


          daItems = attribute.quickPick;
          daList = '';
          for (j = 0; j < daItems.length; j++) {
            daList += '<li><a href="#">' + daItems[j] + '</a></li>';
          }

          inputGroupDropDownMenu = addEle(inputGroupSpan, 'ul', 'dropdown-menu pull-right');
          inputGroupDropDownMenu.innerHTML = daList;
          $(inputGroupDropDownMenu).click(function (e) {
            input.value = e.originalEvent.srcElement.innerText;
            e.preventDefault();
          });
          panel.listeners.push(inputGroupDropDownMenu); // so we can avoid leakage on deleting panel
        }
    }
  }

  /**
   * function to render List
   */

  function renderList(list,theme) {


    var txtDiv = document.createElement("table");
    txtDiv.className = 'table table-condensed table-bordered table-hover-'+theme;
    //bootstrapInterface.info(txtDiv.className);

    /**
     * Header
     */
    var tHead = addEle(txtDiv, 'thead');
    var tHeadRow = addEle(tHead, 'tr');
    for (j = 1; j < list.model.attributes.length; j++) { // skip id (0))
      var hAttribute = list.model.attributes[j];
      addEle(tHeadRow, 'th').innerHTML = hAttribute.label;
    }

    /**
     * Now each row in list
     */
    var gotData = list.moveFirst();
    var tBody = addEle(txtDiv, 'tbody');
    while (gotData) {
      var tBodyRow = addEle(tBody, 'tr');
      var idAttribute = list.model.attributes[0];
      $(tBodyRow).data("id", list.get(idAttribute.name));
      $(tBodyRow).click(function (e) {
        // bootstrapInterface.dispatch(new Request({type: 'Command', command: action}));
        bootstrapInterface.info('you picked #' + $(e.currentTarget).data("id"));
        console.log('fuck ' + $(e.currentTarget).data("id"));
        e.preventDefault();
      });

      for (j = 1; j < list.model.attributes.length; j++) { // skip id (0))
        var dAttribute = list.model.attributes[j];
        addEle(tBodyRow, 'td').innerHTML = list.get(dAttribute.name);
      }
      gotData = list.moveNext();
    }
    panel.panelForm.appendChild(txtDiv);

  }


  /**
   * function to render Command
   */
  function renderCommand(command) {

    if (!panel.buttonDiv) {
      var formGroup = addEle(panel.panelForm, 'div', 'form-group');
      //panel.buttonDiv = addEle(formGroup, 'div', 'col-sm-offset-3 col-sm-9'); // after form
      panel.buttonDiv = addEle(formGroup, 'div', 'col-sm-9');
    }
    var cmdTheme = command.theme || 'default';
    var button = addEle(panel.buttonDiv, 'button', 'btn btn-' + cmdTheme + ' btn-presentation', {type: 'button'});

    var icon = command.icon;
    if (icon) {
      if (left(icon, 2) == 'fa')
        icon = '<i class="fa ' + icon + '"></i>&nbsp;';
      else
        icon = '<span class="glyphicon ' + icon + '"></span>&nbsp;';
      button.innerHTML = icon + command.name;
    } else {
      button.innerHTML = command.name;
    }

    $(button).on('click', function (event) {
      event.preventDefault();
      bootstrapInterface.dispatch(new Request({type: 'Command', command: command}));
    });
    panel.listeners.push(button); // so we can avoid leakage on deleting panel
  }
};
