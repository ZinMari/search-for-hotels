import htmlmin from "gulp-htmlmin";

export const htmlMinify = () => {
  return app.gulp.src(`${app.paths.base.build}/**/*.html`)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(app.gulp.dest(buildFolder));
}
