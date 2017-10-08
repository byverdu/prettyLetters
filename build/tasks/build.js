const gulp = require( 'gulp' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const stripCode = require( 'gulp-strip-code' );
const paths = require( '../paths' );
const pump = require( 'pump' );

gulp.task( 'build-test', [ 'clean' ], ( callback ) => {
  pump([
    gulp.src( paths.srcPath ),
    stripCode({
      start_comment: 'dev-code',
      end_comment: 'end-dev-code'
    }),
    uglify({ mangle: true }),
    sourcemaps.init({ loadMaps: true }),
    rename({
      basename: paths.minifiedOutput,
      suffix: '.min'
    }),
    sourcemaps.write( './' ),
    gulp.dest( paths.destPath )], callback );
});

gulp.task( 'move-js', () => {
  gulp.src( paths.srcPath )
  .pipe( stripCode({
    start_comment: 'dev-code',
    end_comment: 'end-dev-code'
  }))
  .pipe( gulp.dest( paths.destPath ));
});
