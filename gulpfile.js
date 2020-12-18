const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

sass.compiler = require('sass');

const paths = {
    root: __dirname,

    vendor: './node_modules/',

    shared: [
        './shared/styles/',
        './public/build/'
    ],

    main: [
        './main/',
        './public/build/'
    ]
};

const modules = ['main', 'shared'];

function build() {
    return gulp.parallel(...modules.map(name => {
        const [src, dest] = paths[name];

        return () => gulp.src(`${src}index.scss`)
            .pipe(sass({
                includePaths: [paths.root, paths.shared[0], paths.vendor],
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie >= 9']
            }))
            .pipe(rename(`${name}.css`))
            .pipe(gulp.dest(dest));
    }));
}

function dev() {
    return gulp.watch(
        modules.map(name => `${paths[name][0]}**/*.scss`),
        build()
    );
}

exports.build = build();
exports.dev = dev;