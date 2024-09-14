import webp from 'gulp-webp';

export const webpImages = () => {
  return app.gulp.src([`${app.paths.srcPartialsFolder}/**/*.{jpg,jpeg,png,svg}`], { encoding: false })
    .pipe(webp())
    .pipe(app.gulp.dest(app.paths.buildImgFolder))
};
