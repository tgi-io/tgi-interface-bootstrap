
#### BootstrapInterface
The BootstrapInterface uses  Bootstrap (http://www.idangero.us/bootstrap) to create a IOS 7+ type of UI.

Core tests run: {"testsCreated":524}    

This doc may be outdated since tests run in browser.  See source code for more info.    

#### CONSTRUCTOR
&nbsp;<b><i>objects created should be an instance of Interface:</i></b>
```javascript
var i = new SurrogateInterface();
return (i instanceof SurrogateInterface) && (i instanceof Interface);
```
<blockquote>returns <strong>true</strong> as expected
</blockquote>
&nbsp;<b><i>should make sure new operator used:</i></b>
```javascript
SurrogateInterface(); // jshint ignore:line
```
<blockquote><strong>Error: new operator required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>should make sure argument properties are valid:</i></b>
```javascript
new SurrogateInterface({yo: 'whatup'});
```
<blockquote><strong>Error: error creating Interface: invalid property: yo</strong> thrown as expected
</blockquote>
&nbsp;<b><i>allowable properties:</i></b>
```javascript
new SurrogateInterface({name: 'pen', description: 'old school', vendor: Object}); // Vendor is reference needed vendor liblib
```
&nbsp;<b><i>must supply vendor in constructor:</i></b>
```javascript
new BootstrapInterface().start(new Application(), new Presentation(), function () {
});
```
<blockquote><strong>Error: Error initializing Bootstrap</strong> thrown as expected
</blockquote>
#### PROPERTIES
#### name
&nbsp;<b><i>defaults to (unnamed):</i></b>
```javascript
return new SurrogateInterface().name;
```
<blockquote>returns <strong>(unnamed)</strong> as expected
</blockquote>
#### description
&nbsp;<b><i>defaults to Interface implementation:</i></b>
```javascript
this.log(new SurrogateInterface().description);
```
<blockquote><strong>log: </strong>a BootstrapInterface<br></blockquote>
#### METHODS
#### toString()
&nbsp;<b><i>should return a description of the message:</i></b>
```javascript
return new SurrogateInterface({description: 'Punched Card Interface'}).toString();
```
<blockquote>returns <strong>Punched Card Interface</strong> as expected
</blockquote>
#### start()
The start method initiates the interface and passes a callback for the interface to submit requests. The callback must pass a Request object followed by an optional callback for responses to the request e.g. interface.start ( function ( request, response(callback) ) ) {}    

&nbsp;<b><i>Application parameter is required:</i></b>
```javascript
new SurrogateInterface().start();
```
<blockquote><strong>Error: Application required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>presentation parameter is required:</i></b>
```javascript
new SurrogateInterface().start(new Application());
```
<blockquote><strong>Error: presentation required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>callback parameter required:</i></b>
```javascript
new SurrogateInterface().start(new Application(), new Presentation());
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
#### stop()
calling stop will end the start() processing and release any resources    

&nbsp;<b><i>must pass callback function:</i></b>
```javascript
new SurrogateInterface().stop();
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
#### dispatch()
The dispatch method will accept a request and act on it or pass it to the app.    

&nbsp;<b><i>must pass a Request object:</i></b>
```javascript
new SurrogateInterface().dispatch();
```
<blockquote><strong>Error: Request required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>send command without callback when no response needed:</i></b>
```javascript
new SurrogateInterface().dispatch(new Request({type: 'Command', command: new Command()}));
```
&nbsp;<b><i>optional second parameter is the response callback:</i></b>
```javascript
new SurrogateInterface().dispatch(new Request({type: 'Command', command: new Command()}), true);
```
<blockquote><strong>Error: response callback is not a function</strong> thrown as expected
</blockquote>
#### notify()
The notify method sends a `Message` to the Interface.  This can be the result of a request sent from the start() callback.    

&nbsp;<b><i>must pass a Message object:</i></b>
```javascript
new SurrogateInterface().notify();
```
<blockquote><strong>Error: Message required</strong> thrown as expected
</blockquote>
#### render()
&nbsp;<b><i>first argument must be a Presentation instance:</i></b>
```javascript
new SurrogateInterface().render();
```
<blockquote><strong>Error: Presentation object required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>optional callback must be function:</i></b>
```javascript
new SurrogateInterface().render(new Presentation(), true);
```
<blockquote><strong>Error: optional second argument must a commandRequest callback function</strong> thrown as expected
</blockquote>
#### canMock()
&nbsp;<b><i>returns boolean to indicate if interface has mocking ability:</i></b>
```javascript
var canMock = new SurrogateInterface().canMock();
return typeof canMock;
```
<blockquote>returns <strong>boolean</strong> as expected
</blockquote>
#### mockRequest()
&nbsp;<b><i>parameter must be request or array of requests:</i></b>
```javascript
var ui = new SurrogateInterface();
this.shouldThrowError('Error: missing request parameter', function () {
  ui.mockRequest();
});
// Empty Stub Commands are ignored in mocks
ui.mockRequest(new Request(new Command())); // Send single command
ui.mockRequest([new Request(new Command()), new Request(new Command())]); // Send array of commands
// Test when one of array elements is bad
this.shouldThrowError('Error: invalid request parameter', function () {
  ui.mockRequest([new Request(new Command()), 'wtf']);
});
```
#### info(text)
Display info to user in background of primary presentation.    

&nbsp;<b><i>must set interface before invoking:</i></b>
```javascript
new Application().info();
```
<blockquote><strong>Error: interface not set</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must supply the text info:</i></b>
```javascript
new Application({interface: new SurrogateInterface()}).info();
```
<blockquote><strong>Error: text parameter required</strong> thrown as expected
</blockquote>
#### ok(prompt, callBack)
Pause before proceeding    

&nbsp;<b><i>must set interface before invoking:</i></b>
```javascript
new Application().ok();
```
<blockquote><strong>Error: interface not set</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must provide the text prompt param:</i></b>
```javascript
new Application({interface: new SurrogateInterface()}).ok();
```
<blockquote><strong>Error: prompt required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must provide callback param:</i></b>
```javascript
new Application({interface: new SurrogateInterface()}).ok('You are about to enter the twilight zone.');
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
#### yesno(prompt, callBack)
Query user with a yes no question.    

&nbsp;<b><i>must set interface before invoking:</i></b>
```javascript
new Application().yesno();
```
<blockquote><strong>Error: interface not set</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must provide the text question param:</i></b>
```javascript
new Application({interface: new SurrogateInterface()}).yesno();
```
<blockquote><strong>Error: prompt required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must provide callback param:</i></b>
```javascript
new Application({interface: new SurrogateInterface()}).yesno('Are we there yet?');
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
#### ask(prompt, attribute, callBack)
Simple single item prompt.    

&nbsp;<b><i>must provide the text question param:</i></b>
```javascript
new SurrogateInterface().ask();
```
<blockquote><strong>Error: prompt required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must supply attribute:</i></b>
```javascript
new SurrogateInterface().ask('What it do');
```
<blockquote><strong>Error: instance of Attribute a required parameter</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must provide callback param:</i></b>
```javascript
new SurrogateInterface().ask('Please enter your name', new Attribute({name: 'Name'}));
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
#### choose(prompt, choices, callBack)
prompt to choose an item    

&nbsp;<b><i>must provide text prompt first:</i></b>
```javascript
new SurrogateInterface().choose();
```
<blockquote><strong>Error: prompt required</strong> thrown as expected
</blockquote>
&nbsp;<b><i>must supply array of choices:</i></b>
```javascript
this.shouldThrowError(Error('choices array required'), function () {
  new SurrogateInterface().choose('What it do');
});
this.shouldThrowError(Error('choices array required'), function () {
  new SurrogateInterface().choose('this will not', 'work');
});
this.shouldThrowError(Error('choices array empty'), function () {
  new SurrogateInterface().choose('empty array?', []);
});
```
&nbsp;<b><i>must provide callback param:</i></b>
```javascript
new SurrogateInterface().choose('choose wisely', ['rock', 'paper', 'scissors']);
```
<blockquote><strong>Error: callBack required</strong> thrown as expected
</blockquote>
#### Interface Integration
&nbsp;<b><i>user queries:</i></b>
```javascript
var io = new SurrogateInterface();
var app = new Application({interface: io});
/**
 * Each test is a function ...
 */
var ok1 = function () {
  io.mockRequest(new Request('ok'));
  app.ok('You can mock ok() before', function () {
    ok2();
  });
};
var ok2 = function () {
  app.ok('You can mock ok() after', function () {
    yesno1();
  });
  io.mockRequest(new Request('ok'));
};
var yesno1 = function () {
  app.yesno('Yesno can be true', function (answer) {
    if (answer)
      yesno2();
    else
      callback('fail');
  });
  io.mockRequest(new Request('yes'));
};
var yesno2 = function () {
  app.yesno('Yesno can be false', function (answer) {
    if (!answer)
      ask1();
    else
      callback('fail');
  });
  io.mockRequest(new Request('no'));
};
var ask1 = function () {
  var name = new Attribute({name: 'Name'});
  app.ask('What is your name?', name, function (answer) {
    app.info('Hello ' + answer);
    if (answer == 'John Doe')
      ask2();
    else
      callback(answer);
  });
  io.mockRequest(new Request({type: 'ask', value: 'John Doe'}));
};
var ask2 = function () {
  var name = new Attribute({name: 'Name'});
  io.mockRequest(new Request({type: 'ask'})); // no value like canceled dialog
  app.ask('Vas is das name?', name, function (answer) {
    if (undefined === answer)
      choose1();
    else
      callback(answer);
  });
};
var choose1 = function () {
  app.choose('Pick one...', ['chicken', 'beef', 'tofu'], function (choice) {
    if (choice == 1)
      choose2();
    else
      callback(choice);
  });
  io.mockRequest(new Request({type: 'choose', value: 'beef'}));
};
var choose2 = function () {
  io.mockRequest(new Request({type: 'choose'})); // no value like canceled dialog
  app.choose('Pick one...', ['chicken', 'beef', 'tofu'], function (choice) {
    if (undefined === choice)
      callback('The End');
    else
      callback(choice);
  });
};
/**
 * Launch test
 */
ok1();
```
<blockquote>returns <strong>The End</strong> as expected
</blockquote>
#### METHODS
meh    

#### INTEGRATION
blah    

## [&#9664;](#-bootstrapinterface)&nbsp;[&#8984;](#table-of-contents) &nbsp;Summary
This documentation generated with https://github.com/tgicloud/tgi-spec.<br>TODO put testin stats here.    
