const gulp = require( 'gulp' );
const browserSync = require( 'browser-sync' );
const paths = require( '../paths' );

gulp.task( 'serve-test', [ 'build-test' ], ( done ) => {
  browserSync({
    open: false,
    port: 9000,
    reloadDelay: 2000,
    server: {
      baseDir: paths.srcMocha,
      middleware( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        next();
      }
    }
  }, done );
});
