/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap-navigation.source.js
 */
BootstrapInterface.prototype.htmlNavigation = function () {
  var addEle = BootstrapInterface.addEle;
  this.doc.navBar = addEle(document.body, 'nav', 'navbar navbar-default navbar-fixed-top');
  var navBarContainer = addEle(this.doc.navBar, 'div', 'container');
  this.doc.navBarHeader = addEle(navBarContainer, 'div', 'navbar-header');
  var navBarHeaderButton = addEle(this.doc.navBarHeader, 'button', 'navbar-toggle collapsed', {
    'data-toggle': 'collapse',
    'data-target': '#navbar',
    'aria-expanded': 'false',
    'aria-controls': 'navbar'
  });
  addEle(navBarHeaderButton, 'span', 'icon-bar');
  addEle(navBarHeaderButton, 'span', 'icon-bar');
  addEle(navBarHeaderButton, 'span', 'icon-bar');
  this.doc.navBarBody = addEle(navBarContainer, 'div', 'navbar-collapse collapse', {id: 'navbar'});
  this.doc.navBarAlert = addEle(navBarContainer, 'div', 'container', {style: "margin:0"})
  this.refreshNavigation();
};
BootstrapInterface.prototype.refreshNavigation = function () {
  this.doc.navBarBody.innerHTML = ''; // remove any child nodes
  var addEle = BootstrapInterface.addEle;
  this.doc.navBarLeft = addEle(this.doc.navBarBody, 'ul', 'nav navbar-nav');
  this.doc.navBarRight = addEle(this.doc.navBarBody, 'ul', 'nav navbar-nav navbar-right');
  /**
   * Brand
   */
  addEle(this.doc.navBarHeader, 'a', 'navbar-brand').innerHTML = '<a href="#">' + this.application.get('brand') + '</a>';
  /**
   * Menu
   */
  var menuContents = this.presentation.get('contents');
  var separatorSeen = false;
  for (var menuItem in menuContents) if (menuContents.hasOwnProperty(menuItem)) {
    if (menuContents[menuItem].type == 'Menu') {
      var parentMenu = this.addNavBarListMenu(this.doc.navBarLeft, menuContents[menuItem]);
      var subMenu = menuContents[menuItem].contents;
      for (var subPres in subMenu)
        if (subMenu.hasOwnProperty(subPres))
          this.addNavBarListItem(parentMenu, subMenu[subPres]);
    } else {
      if (menuContents[menuItem] == '-')
        separatorSeen = true;
      else
        this.addNavigationItem((separatorSeen ? this.doc.navBarRight : this.doc.navBarLeft), menuContents[menuItem]);
    }
  }
};
BootstrapInterface.prototype.addNavigationItem = function (parent, action) {
  var bootstrapInterface = this;
  var listItem = BootstrapInterface.addEle(parent, 'li');
  var icon = '';
  var theme = action.theme || 'default';
  if (action.icon) {
    if (left(action.icon,2) == 'fa')
      icon = '<i class="fa ' + action.icon + '"></i>&nbsp;';
    else
      icon = '<span class="glyphicon ' + action.icon + '"></span>&nbsp;';
  }
  listItem.innerHTML = '<button type="button" class="btn btn-' + theme + ' navbar-btn">' + icon + action.name + '</button>';
  $(listItem).click(function (e) {
    bootstrapInterface.dispatch(new Request({type: 'Command', command: action}));
    e.preventDefault();
  });
};
BootstrapInterface.prototype.addNavBarListItem = function (parent, action, icon) {
  var self = this;
  var html;
  var listItem = document.createElement('li');
  icon = icon || '';
  if (action instanceof Command) {
    html = '<a>' + icon + action.name + '</a>';
    $(listItem).click(function (e) {
      self.dispatch(new Request({type: 'Command', command: action}));
      e.preventDefault();
    });
  } else {
    if (action == '-') {
      listItem.className = 'divider';
    } else {
      listItem.className = 'dropdown-header';
      html = action;
    }
  }
  listItem.innerHTML = html;
  parent.appendChild(listItem);
};
BootstrapInterface.prototype.addNavBarListMenu = function (parent, action) {

  var icon = '';
  var theme = action.theme || 'default';
  if (action.icon) {
    if (left(action.icon,2) == 'fa')
      icon = '<i class="fa ' + action.icon + '"></i>&nbsp;';
    else
      icon = '<span class="glyphicon ' + action.icon + '"></span>&nbsp;';
  }

  var dropDown = document.createElement('li');
  dropDown.className = "dropdown";
  dropDown.innerHTML = '<button type="button" class="dropdown-toggle btn btn-' + theme + ' navbar-btn" data-toggle="dropdown">' + icon + action.name + '&nbsp;<b class="caret"></b></button>';
  parent.appendChild(dropDown);

  var dropDownMenu = document.createElement('ul');
  dropDownMenu.className = "dropdown-menu";
  dropDown.appendChild(dropDownMenu);

  return dropDownMenu;
};