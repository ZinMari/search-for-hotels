import gulpPug from 'gulp-pug';
import typograf from "gulp-typograf";
import browserSync from 'browser-sync';
import rename from 'gulp-rename';

export const pug = () => {
  return app.gulp.src([`${app.paths.base.src}/*.pug`, app.paths.pagesFolder])
    .pipe(
      gulpPug({
        pretty: true
      })
    )
    // .pipe(typograf({
    //   locale: ['ru', 'en-US']
    // }))
    .pipe(rename({dirname: ''}))
    .pipe(app.gulp.dest(app.paths.base.build))
    .pipe(browserSync.stream());
};
