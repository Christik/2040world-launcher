const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const hb = require('gulp-hb');

// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        injectChanges: true,
        server: { baseDir: './' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

function styles() {
    return src('./_asset/less/styles.less')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'], grid: true
        }))
        .pipe(dest('./_asset/css/'))
        .pipe(browserSync.stream())
}

function html() {
    return src('./_asset/templates/*.html')
        .pipe(hb()
            .partials('./_asset/templates/**/*.hbs')
            .helpers('./_asset/js/handlebars-helpers.js')
            .data('./_asset/data/**/*.{js,json}')
        )
        .pipe(dest('./'))
        .pipe(browserSync.stream());
}

function startwatch() {
    // Мониторим файлы на изменения
    watch('./_asset/less/**/*.less', styles);
    watch('./_asset/templates/**/**/*.(hbs|html)', html);
    watch('./_asset/js/**/*.js').on('change', browserSync.reload);
    watch('./_asset/data/**/*.json').on('change', browserSync.reload);
}

// Экспортируем функцию browsersync() как таск browsersync.
// Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
exports.styles = styles;
exports.html = html;

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, html, browsersync, startwatch);








