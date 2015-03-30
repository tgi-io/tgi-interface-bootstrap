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
  '#Info',
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
  '#Command',
  'Including `Command` objects in presentation contents will render as buttons.',
  defaultCommand,
  infoCommand,
  beerCommand,
  '###Note',
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
 * Attribute (Minimal) Presentation
 */
var attributePresentation = new tgi.Presentation();
attributePresentation.set('contents', [
  'Enter some stuff',
  '-',
  new tgi.Attribute({name: 'login', label: 'Login', type: 'String(20)', hint: {required: true}, value: ''}),
  new tgi.Attribute({name: 'password', label: 'Password', type: 'String(20)', hint: {password: true}, value: ''}),
  '-',
  new tgi.Attribute({name: 'firstName', label: 'First Name', type: 'String(20)', value: 'John'}),
  new tgi.Attribute({name: 'lastName', label: 'Last Name', type: 'String(25)', value: 'Doe'}),
  new tgi.Attribute({name: 'address', label: 'Address', type: 'String(50)'}),
  new tgi.Attribute({name: 'city', label: 'City', type: 'String(35)'}),
  new tgi.Attribute({name: 'state', label: 'State', type: 'String(2)'}),
  new tgi.Attribute({name: 'zip', label: 'Zip Code', type: 'String(10)', placeHolder: '#####-####'}),
  new tgi.Attribute({name: 'birthDate', label: 'Birth Date', type: 'Date', value: new Date()}),
  new tgi.Attribute({name: 'drink', type: 'String(25)', quickPick: ['Water', 'Coke', 'Coffee']}),
  new tgi.Attribute({name: 'sex', type: 'Boolean', value: true}),
  new tgi.Attribute({name: 'drugs', type: 'Boolean', value: false}),
  new tgi.Attribute({name: 'IQ', type: 'Number', value: 100})



]);
var attributeCommand = new tgi.Command({
  name: 'Attribute',
  type: 'Presentation',
  theme: 'success',
  icon: 'fa-list-alt',
  contents: attributePresentation
});

/**
 * Navigation
 */
nav.set('contents', [
  defaultCommand,
  infoCommand,
  beerCommand,
  commandCommand,
  attributeCommand
]);

/**
 * Start the app
 */
app.start(function (request) {
  app.info('app got ' + request);
});
bs.activatePanel(attributeCommand);