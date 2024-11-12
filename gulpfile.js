import gulp from 'gulp';
import browserSync from 'browser-sync';

import { paths } from './gulp/config/paths.js';
import { clean } from './gulp/tasks/clean.js';
// import { svgSprites } from './gulp/tasks/sprite.js';
import { styles } from './gulp/tasks/styles.js';
import { stylesBackend } from './gulp/tasks/styles-backend.js';
import { scripts } from './gulp/tasks/scripts.js';
import { scriptsBackend } from './gulp/tasks/scripts-backend.js';
import { resources } from './gulp/tasks/resources.js';
import { images } from './gulp/tasks/images.js';
import { webpImages } from './gulp/tasks/webp.js';
import { cacheTask } from './gulp/tasks/cache.js';
import { rewrite } from './gulp/tasks/rewrite.js';
import { htmlMinify } from './gulp/tasks/html-minify.js';
import { zipFiles } from './gulp/tasks/zip.js';
import { pug } from './gulp/tasks/pug.js';

global.app = {
  gulp,
  isProd: process.argv.includes('--build'),
  paths,
}

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: `${app.paths.base.build}`,
    },
    notify: false,
    port: 3000,
  });

  gulp.watch([app.paths.srcScss, `${app.paths.base.src}/**/*.scss`], styles);
  gulp.watch([`${app.paths.srcPartialsFolder}/components/**/*.js`, app.paths.srcFullJs, `${app.paths.srcPartialsFolder}/pages/**/*.js`], scripts);
  gulp.watch(`${app.paths.srcPartialsFolder}/*.pug`, pug);
  gulp.watch(`${app.paths.base.src}/**/*.pug`, pug);
  gulp.watch(`${app.paths.resourcesFolder}/**`, resources);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
  // gulp.watch(app.paths.srcSvg, svgSprites);
}

const dev = gulp.series(clean, pug, scripts, styles, resources, images, webpImages, /*svgSprites,*/ watcher);
const backend = gulp.series(clean, pug, scriptsBackend, stylesBackend, resources, images, webpImages, /*svgSprites,*/);
const build = gulp.series(clean, pug, scripts, styles, resources, images, webpImages, /*svgSprites,*/ htmlMinify);
const cache = gulp.series(cacheTask, rewrite);
const zip = zipFiles;

export { dev }
export { build }
export { backend }
export { cache }
export { zip }
export { pug }

gulp.task('default', dev);
