/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/test/html-play.js
 **/

var tgi = TGI.CORE();
var f7 = new (TGI.INTERFACE.BOOTSTRAP().BootstrapInterface)({vendor: Bootstrap});
var app = new tgi.Application({interface: f7});
var nav = new tgi.Presentation();

app.setInterface(f7);
app.set('brand', 'TGI Play');
app.setPresentation(nav);
app.start(function (request) {
  console.log('app got ' + JSON.stringify(request));
});

var name,
  isDude,
  color;


var cmd = new tgi.Command({
  name: 'cmdProcedure', type: 'Procedure', contents: new tgi.Procedure({
    tasks: [
      function () {
        var task = this;
        app.ask('What is first your name?', new tgi.Attribute({name: 'name'}), function (reply) {
          if (!reply)
            cmd.abort();
          else {
            name = reply;
            task.complete();
          }
        });
      },
      function () {
        var task = this;
        app.yesno(name + ' are you a dude?', function (reply) {
          isDude = reply;
          task.complete();
        });
      },
      function () {
        var task = this;
        app.choose('OK ' + (isDude ? 'mr. ' : 'ms. ') + name + ', please pick a color.\nany color..\n\nplease pick one now', ['red', 'green', 'blue', 'black', 'white'], function (choice) {
          if (!choice)
            cmd.abort();
          else {
            color = choice;
            task.complete();
          }
        });
      },
      function () {
        var task = this;
        app.ok(name + ' is a ' + color + (isDude ? ' dude.' : ' chick.') + '\n\n*** THE END ***', function () {
          task.complete();
        });
      }
    ]
  })
});
cmd.onEvent('*', function (event) {
  if (event == 'Aborted') {
    app.ok('\nok fine\n\nbe that way', function () {
    });
  }
  app.info('cmd.onEvent: ' + event);
});
cmd.execute();


//
//
//var okFine = function(){
//  app.ok('OK fine.\n\nBe that way.');
//};
//
//var getName = function () {
//
//};
//
//var getSex = function () {
//
//};
//
//var getRace = function () {
//
//}
//
//app.ask('What is your name?', new tgi.Attribute({name: 'name'}), function (name) {
//  if (name)
//    app.info('What\'s up ' + name + '?');
//  else {
//    name = 'Dude';
//    app.info('Let\'s call you ' + name + '.');
//  }
//  app.choose(name + ', please pick a color.\nany color..\n\nplease pick one now',['red','green','blue','black','white'], function (color) {
//    app.info('You picked  ' + color);
//    app.yesno(name + ' are you a dude?', function (dude) {
//      app.ok(name + ' is a ' +  color +  (dude ? ' dude.' : ' chick.') + '\n\n*** THE END ***', function () {
//      });
//    });
//  });
//});
