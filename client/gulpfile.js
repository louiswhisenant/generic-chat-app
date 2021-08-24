const gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
	// Point to scss
	return (
		gulp
			.src('./src/assets/scss/**/*.scss')
			// pass it to sass compiler
			.pipe(sass().on('error', sass.logError))
			// point to css
			.pipe(gulp.dest('./src/assets/css'))
			// update browser with changes
			.pipe(browserSync.stream())
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});

	gulp.watch('./src/assets/scss/**/*.scss', style);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
