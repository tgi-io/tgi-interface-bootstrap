/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/test/html-play.js
 **/
var tgi = TGI.CORE();
var bs = new (TGI.INTERFACE.BOOTSTRAP().BootstrapInterface)({vendor: Date}); // no vendor function TODO wtf
var app = new tgi.Application({interface: bs});
var nav = new tgi.Presentation();
app.setInterface(bs);
app.set('brand', 'Presentation');
app.setPresentation(nav);

var i;
var themes = ['default', 'primary', 'success', 'info', 'warning', 'danger'];


/**
 * Default (Minimal) Presentation
 */
var defaultPresentation = new tgi.Presentation();
defaultPresentation.set('contents', ['i got nothin']);
var defaultCommand = new tgi.Command({
  name: 'Default',
  type: 'Presentation',
  contents: defaultPresentation
});

/**
 * Beer Presentation (Spam)
 */
var beerPresentation = new tgi.Presentation();
var bottles = [];
for (var beer = 99; beer > 0; beer--) bottles.push('' + beer + ' bottles of beer on the wall, ' +
  beer + ' bottles of beer. Take one down, pass it around, ' +
  (beer - 1) + ' bottles of beer on the wall...');
beerPresentation.set('contents', bottles);
var beerCommand = new tgi.Command({
  name: 'Beer',
  type: 'Presentation',
  theme: 'warning',
  icon: 'fa-beer',
  contents: beerPresentation
});

/**
 * Info only
 */
var infoPresentation = new tgi.Presentation();
infoPresentation.set('contents', [
  'Info\n---',
  'This is themed `info` with an icon *(glyphicon-info-sign)*.',
  '-',
  'Note the divider above and below to understand _read the code Luke_',
  '-',
  'Also this uses **markdown** for `cool` stuff.'
]);
var infoCommand = new tgi.Command({
  name: 'Info',
  type: 'Presentation',
  theme: 'info',
  icon: 'glyphicon-info-sign',
  contents: infoPresentation
});

/**
 * Command only
 */
var commandPresentation = new tgi.Presentation();
commandPresentation.set('contents', [
  '# Command',
  'Including `Command` objects in presentation contents will render as buttons.',
  defaultCommand,
  infoCommand,
  beerCommand,
  '### Note',
  'Commands are all grouped and rendered at bottom of panel',
  new tgi.Command()

]);
var commandCommand = new tgi.Command({
  name: 'Command',
  type: 'Presentation',
  theme: 'danger',
  icon: 'fa-cog',
  contents: commandPresentation
});

/**
 * Attribute Presentation
 */
var attributePresentation = new tgi.Presentation();
var drinks = ['Water', 'Coke', 'Coffee'];

var firstName = new tgi.Attribute({name: 'firstName', label: 'First Name', type: 'String(20)', value: 'John'});
var lastName = new tgi.Attribute({name: 'lastName', label: 'Last Name', type: 'String(25)', value: 'Doe'});
var birthday=new tgi.Attribute({name: 'birthDate', label: 'Birth Date', type: 'Date', value: new Date()});
var drink = new tgi.Attribute({name: 'drink', type: 'String(25)', quickPick: drinks, validationRule: {isOneOf: drinks}});
var sex = new tgi.Attribute({name: 'sex', type: 'Boolean', value: true});
var drugs = new tgi.Attribute({name: 'drugs', type: 'Boolean', value: false});
var iq = new tgi.Attribute({name: 'IQ', type: 'Number', value: 1, validationRule: {range: [90, 160]}});

attributePresentation.set('contents', [
  'Enter some stuff',
  '-',
  new tgi.Attribute({name: 'login', label: 'Login', type: 'String(20)', validationRule: {required: true}, value: ''}),
  new tgi.Attribute({name: 'password', label: 'Password', type: 'String(20)', hint: {password: true}, value: ''}),
  '-',
  firstName,
  lastName,
  new tgi.Attribute({name: 'address', label: 'Address', type: 'String(50)'}),
  new tgi.Attribute({name: 'city', label: 'City', type: 'String(35)'}),
  new tgi.Attribute({name: 'state', label: 'State', type: 'String(2)'}),
  new tgi.Attribute({name: 'zip', label: 'Zip Code', type: 'String(10)', placeHolder: '#####-####'}),
  birthday,
  drink,
  sex,
  drugs,
  iq,
  '-',
  new tgi.Command({
    name: 'validate',
    type: 'Function', contents: function () {
      attributePresentation.validate(function () {
        if (attributePresentation.validationMessage) {
          app.info('Please correct: ' + attributePresentation.validationMessage);
        } else {
          app.info('Good Job!!!');
        }
      });
    }
  }),
  new tgi.Command({
    name: 'set GW',
    type: 'Function', contents: function () {
      console.log('poop');
      firstName.set('George');
      lastName.set('Washington');
      birthday.set(birthday.coerce('2/22/1732'));
      iq.set(100);
      sex.set(false);
      drugs.set(true);
    }
  })

]);
var attributeCommand = new tgi.Command({
  name: 'Attribute',
  type: 'Presentation',
  theme: 'primary',
  icon: 'fa-list-alt',
  contents: attributePresentation
});


// Create actor class
var Actor = function (args) {
  tgi.Model.call(this, args);
  this.modelType = "Actor";
  this.attributes.push(new tgi.Attribute('Name'));
  this.attributes.push(new tgi.Attribute('Born', 'Number'));
  this.attributes.push(new tgi.Attribute('Sex'));
};
Actor.prototype = Object.create(tgi.Model.prototype);
var actor = new Actor();
var actors = new tgi.List(actor);
var actorsInfo = [
  // Actor              Born  Male
  ['Jack Nicholson', 1937, 'male'],
  ['Meryl Streep', 1949, 'female'],
  ['Marlon Brando', 1924, 'male'],
  ['Cate Blanchett', 1969, 'female'],
  ['Robert De Niro', 1943, 'male'],
  ['Judi Dench', 1934, 'female'],
  ['Al Pacino', 1940, 'male'],
  ['Nicole Kidman', 1967, 'female'],
  ['Daniel Day-Lewis', 1957, 'male'],
  ['Shirley MacLaine', 1934, 'female'],
  ['Dustin Hoffman', 1937, 'male'],
  ['Jodie Foster', 1962, 'female'],
  ['Tom Hanks', 1956, 'male'],
  ['Kate Winslet', 1975, 'female'],
  ['Anthony Hopkins', 1937, 'male'],
  ['Angelina Jolie', 1975, 'female'],
  ['Paul Newman', 1925, 'male'],
  ['Sandra Bullock', 1964, 'female'],
  ['Denzel Washington', 1954, 'male'],
  ['Renée Zellweger', 1969, 'female']
];
var id = 0;
for (i in actorsInfo) {
  if (actorsInfo.hasOwnProperty(i)) {
    actors.addItem();
    actors.set('id', id++);
    actors.set('Name', actorsInfo[i][0]);
    actors.set('Born', actorsInfo[i][1]);
    actors.set('Sex', actorsInfo[i][2]);
  }
}

/**
 * List Presentation
 */
var listPresentation = new tgi.Presentation();
listPresentation.set('contents', ['Lists\n---', actors, defaultCommand,
  infoCommand,
  beerCommand
]);

var listCommandContents = ['Select Theme', '-'];
for (i = 0; i < themes.length; i++) {
  var theme = themes[i];
  listCommandContents.push(new tgi.Command({
    name: theme + ' list',
    type: 'Presentation',
    theme: theme,
    icon: 'fa-table',
    contents: listPresentation
  }));
}

var listCommand = new tgi.Command({
  name: 'list',
  type: 'Menu',
  icon: 'fa-table',
  contents: listCommandContents
});

var loginPresentation = new tgi.Presentation();
var storePicks = ['HostStore', 'MemoryStore', 'LocalStore'];
var login = new tgi.Attribute({
  name: 'login',
  label: 'Login',
  type: 'String(20)',
  validationRule: {required: true},
  value: ''
});
loginPresentation.set('contents', [
  'Please login to see the fun stuff.',
  '-',
  login,
  new tgi.Attribute({name: 'password', label: 'Password', type: 'String(20)', hint: {password: true}, value: ''}),
  new tgi.Attribute({name: 'store', label: 'Store', type: 'String(20)', quickPick: storePicks, value: storePicks[0]}),
  '-',
  new tgi.Command({
    name: 'Login', type: 'Function', theme: 'info', icon: 'fa-sign-in', contents: function () {
      console.log('bing');
      loginPresentation.validate(function () {
        if (loginPresentation.validationMessage) {
          app.info('Please correct: ' + login.validationErrors[0]);
        } else {
          app.info('no error');
          // $("#panel1").show(); // todo don't hard code ?
          // app.setAppPresentation(privateMenu);
        }
      });
    }
  })
]);
var loginCommand = new tgi.Command({
  name: 'login',
  type: 'Presentation',
  //theme: 'info',
  icon: 'fa-sign-in',
  contents: loginPresentation
});

/**
 * DOM leakage testing
 */


var globalShit = {};

var commandDefaultList = new tgi.Command({
  name: 'commandDefaultList',
  type: 'Presentation',
  icon: 'fa-table',
  contents: listPresentation
});

var domTestCommand = new tgi.Command({
  name: 'dom test',
  type: 'Function',
  contents: function () {
    var iterations = 10000;
    app.info('Running ' + iterations + ' iterations.');
    console.log('shitty balls');
    setTimeout(function () {
      for (var j = 0; j < iterations; j++) {
        commandDefaultList.execute(bs);
        bs.destroyPanel(bs.panels[bs.panels.length - 1]);
      }
      app.info('Tests done - Compare heap snapshots now.');
    }, 250);
  }
});

/**
 * Navigation
 */
nav.set('contents', [
  defaultCommand,
  infoCommand,
  beerCommand,
  commandCommand,
  attributeCommand,
  listCommand,
  domTestCommand,
  '-',
  loginCommand
]);

/**
 * Start the app
 */
app.start(function (request) {
  app.info('app got ' + request);
});
attributeCommand.execute(bs);