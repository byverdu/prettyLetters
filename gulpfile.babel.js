import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'build', [
  'clean',
  'build-test',
  'move-js'
]);

gulp.task( 'default', [ 'build']);
gulp.task( 'test', [ 'serve-test', 'watch-test' ]);
