/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap-navigation.source.js
 */
BootstrapInterface.prototype.htmlNavigation = function () {
  var addEle = BootstrapInterface.addEle;
  var navBar = addEle(document.body, 'nav', 'navbar navbar-default navbar-fixed-top');
  var navBarContainer = addEle(navBar, 'div', 'container');
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
  this.refreshNavigation();
};
BootstrapInterface.prototype.refreshNavigation = function () {
  var addEle = BootstrapInterface.addEle;
  var navBarLeft = addEle(this.doc.navBarBody, 'ul', 'nav navbar-nav');
  var navBarRight = addEle(this.doc.navBarBody, 'ul', 'nav navbar-nav navbar-right');
  /**
   * Brand
   */
  addEle(this.doc.navBarHeader, 'a', 'navbar-brand').innerHTML = '<a href="#">' + this.application.get('brand') + '</a>';
  /**
   * Menu
   */
  var menuContents = this.presentation.get('contents');
  var separatorSeen = false;
  for (var menuItem in menuContents) {
    if (menuContents[menuItem] == '-')
      separatorSeen = true;
    else
      this.addNavigationItem((separatorSeen ? navBarRight : navBarLeft), menuContents[menuItem]);
  }
  //addEle(navBarLeft, 'li').innerHTML = '<a href="#">Eat</a>';
  //addEle(navBarLeft, 'li').innerHTML = '<a href="#">More</a>';
  //addEle(navBarLeft, 'li').innerHTML = '<a href="#">Chiken</a>';
  //addEle(navBarRight, 'li').innerHTML = '<a href="#">Face</a>';
};
BootstrapInterface.prototype.addNavigationItem = function (parent, action) {
  var bootstrapInterface = this;
  var listItem = BootstrapInterface.addEle(parent, 'li');
  listItem.innerHTML = '<a>' + action.name + '</a>';
  $(listItem).click(function (e) {
    // console.log(JSON.stringify(action));
    // action.status = undefined;
    console.log('SHITTY BALLS');
    bootstrapInterface.dispatch(new Request({type: 'Command', command: action}));
    e.preventDefault();
  })
};
