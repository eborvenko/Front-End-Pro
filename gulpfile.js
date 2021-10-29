const { src, dest, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');

function cleanDist() {
    return src('./dist', { read: false, allowEmpty: true }).pipe(clean());
}

function copyJs() {
    return src([
        './src/scripts/api.js',

        './src/scripts/index.js',
        // './src/scripts/model/*.js',
        // './src/scripts/view/View.js',
        // './src/scripts/view/TodoListView.js',
        // './src/scripts/view/TodoFormView.js',
        // './src/scripts/controller.js',
        // './src/scripts/index.js',
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist'));
}

function copyVendorJs() {
    return src(['./node_modules/jquery/dist/jquery.min.js'])
        .pipe(concat('vendor.js'))
        .pipe(dest('./dist'));
}

function copyCss() {
    return (
        src([
            './src/styles/style.css',
            // './src/scripts/TodoApp.js',
            // './src/scripts/model/*.js',
            // './src/scripts/view/View.js',
            // './src/scripts/view/TodoListView.js',
            // './src/scripts/view/TodoFormView.js',
            // './src/scripts/controller.js',
            // './src/scripts/index.js',
        ])
            .pipe(concat('app.css'))
            // .pipe(uglify())
            .pipe(dest('./dist'))
    );
}

function copyVendorCss() {
    return src(['./src/vendor/*'])
        .pipe(minifyCss())
        .pipe(concat('vendor.css'))
        .pipe(dest('./dist'));
}

function copyHtml() {
    return src(['./src/index.html']).pipe(dest('./dist'));
}

function watchFiles() {
    return watch(
        ['./src/**/*.js', './src/**/*.html'],
        {
            ignoreInitial: false,
        },
        () => copyJs()
    );
}

module.exports = {
    build: series(cleanDist, parallel(copyHtml, copyJs, copyVendorJs, copyCss, copyVendorCss)),
    serve: series(
        cleanDist,
        parallel(copyHtml, copyJs, copyVendorJs, copyCss, copyVendorCss),
        watchFiles
    ),
};
