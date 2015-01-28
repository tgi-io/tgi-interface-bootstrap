/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-bootstrap/lib/tgi-interface-bootstrap.spec.js
 */

spec.testSection('Interfaces');
spec.test('tgi-core/lib/interfaces/tgi-core-interfaces-repl.spec.js', 'BootstrapInterface', 'Bootstrap Interface', function (callback) {
  var coreTests = spec.mute(false);
  spec.heading('BootstrapInterface', function () {
    spec.paragraph('The BootstrapInterface uses  Bootstrap (http://www.idangero.us/bootstrap) to create a IOS 7+ type of UI.');
    spec.paragraph('Core tests run: ' + JSON.stringify(coreTests));
    spec.paragraph('This doc may be outdated since tests run in browser.  See source code for more info.');
    spec.heading('CONSTRUCTOR', function () {
      spec.runnerInterfaceConstructor(BootstrapInterface);
      spec.example('must supply vendor in constructor', Error('Error initializing Bootstrap'), function () {
        new BootstrapInterface().start(new Application(), new Presentation(), function () {
        });
      });
    });
    spec.runnerInterfaceMethods(BootstrapInterface);
    spec.heading('METHODS', function () {
      spec.paragraph('meh');
    });
    spec.heading('INTEGRATION', function () {
      spec.paragraph('blah');
    });
  });
});
