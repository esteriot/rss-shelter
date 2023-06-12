const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');

// const autoprefixer = require('gulp-autoprefixer');

function images() {
  return src(['src/img/src/*.*', '!src/img/src/*.svg'])
    .pipe(newer('src/img'))
    .pipe(
      avif({
        quality: 50,
      })
    )
    .pipe(src('src/img/src/*.*'))
    .pipe(newer('src/img'))
    .pipe(webp())
    .pipe(src('src/img/src/*.*'))
    .pipe(newer('src/img'))
    .pipe(imagemin())
    .pipe(dest('src/img'));
}

function fonts() {
  return src('src/fonts/src/*.*')
    .pipe(fonter({ formats: ['woff', 'ttf'] }))
    .pipe(src('src/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('src/fonts'));
}

function sprite() {
  return src('src/img/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      })
    )
    .pipe(dest('src/img'));
}

function pages() {
  return src('src/pages/*.html')
    .pipe(
      include({
        includePaths: 'src/components',
      })
    )
    .pipe(dest('src'))
    .pipe(browserSync.stream());
}

function styles() {
  return (
    src(['src/scss/style.scss'])
      // .pipe(
      //   autoprefixer({
      //     overrideBrowserslist: ['last 10 versions'],
      //   })
      // )
      .pipe(concat('style.min.css'))
      .pipe(scss({ outputStyle: 'compressed' }))
      .pipe(dest('src/css'))
      .pipe(browserSync.stream())
  );
}

// 'src/js/*.js', '!src/js/index.min.js'
function scripts() {
  return src(['src/js/index.js'])
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'src/',
      index: 'main.html',
    },
  });
  watch(['src/scss/style.scss'], styles);
  watch(['src/img/src'], images);
  watch(['src/*.html']).on('change', browserSync.reload);
  watch(['src/js/index.js'], scripts);
  watch(['src/components/*', 'src/pages/*'], pages);
}

function cleanDist() {
  return src('dist').pipe(clean());
}

function building() {
  return src(
    [
      'src/css/style.min.css',
      'src/js/index.min.js',
      'src/fonts/*.*',
      'src/**/*.html',
      '!src/img/*.svg',
      '!src/img/stack/*.*',
      'src/img/sprite.svg',
      'src/img/*.*',
    ],
    { base: 'src' }
  ).pipe(dest('dist'));
}

exports.images = images;
exports.pages = pages;
exports.fonts = fonts;
// exports.sprite = sprite;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.building = building;

exports.build = series(cleanDist, building);

exports.default = parallel(styles, scripts, pages, watching);
