const gulp = require( 'gulp' );
const uglify = require( 'gulp-uglify' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const paths = require( '../paths' );
const pump = require( 'pump' );

gulp.task( 'build-js', [ 'clean' ], ( callback ) => {
  pump([
    gulp.src( paths.srcPath ),
    uglify({ mangle: true }),
    sourcemaps.init({ loadMaps: true }),
    rename({
      basename: paths.minifiedOutput,
      suffix: '.min'
    }),
    sourcemaps.write( './' ),
    gulp.dest( paths.destPath )], callback );
});
