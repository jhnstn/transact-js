var gulp = require('gulp')
  , rename = require("gulp-rename")
  , browserify = require('gulp-browserify');


gulp.task('scripts', function() {
    gulp.src('index.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(rename('data.js'))
        .pipe(gulp.dest('./build'))
        .pipe(gulp.dest('./demo'))
});

gulp.task('watch', function() {
  gulp.watch(['index.js','src/**/*/.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
