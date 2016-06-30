var gulp        = require('gulp');
var KarmaServer = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', ['lint'], function(done) {
  var karmaServer = new KarmaServer({
    configFile: __dirname + '/../../karma.conf.js',
      singleRun: true
    }, function(exitCode) {
    done();

    process.exit(exitCode);
  });

  karmaServer.start();
});


/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd',  function(done) {
  var karmaServer = new KarmaServer({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: false,
    browsers: ['Chrome']
  }, function(exitCode) {
    done();

    process.exit(exitCode);
  });

  karmaServer.start();
});
