const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const group_media = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify-es').default;
const strip = require('gulp-strip-comments');
const removeHtmlComments = require('gulp-remove-html-comments');


// Static server
function bs() {
	serveSass();
	browserSync.init({
		server: {
			baseDir: "./src/"
		}
	});
	watch("./src/*.html").on('change', browserSync.reload);
	watch("./src/sass/**/*.sass", serveSass);
	watch("./src/sass/**/*.scss", serveSass);
	watch(".src/img/**/**", imgmin);
	watch("./src/js/*.js").on('change', browserSync.reload);
};

function serveSass () {
	return src('./src/sass/**/*.sass', './src/sass/**/*.scss')
			.pipe(sass())
			.pipe(autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: false
			}))
			.pipe(dest("./src/css"))
			.pipe(browserSync.stream());
};

function buildCSS(done) {
	src('./src/css/**/**.css')
		.pipe(group_media())
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(dest('dist/css/'));
	done();
};

function buildJS(done) {
	src(['./src/js/**.js', '!./src/js/**.min.js'])
		.pipe(strip())
		.pipe(uglify())
		.pipe(dest('dist/js/'));
	src('./src/js/**.min.js')
		.pipe(dest('dist/js/'));
	done();
};

function html(done) {
	src('./src/**.html')
		.pipe(removeHtmlComments())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist/'));
	done();
};

function php (done) {
	src('./src/**.php')
		.pipe(dest('dist/'));
	src('./src/phpmailer/**/**')
		.pipe(dest('./dist/phpmailer/'));
	done();
};

function fonts (done) {
	src('./src/fonts/**/**')
		.pipe(dest('./dist/fonts'));
	done();
};

function imgmin (done) {
	src('./src/img/**/**')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3
		}))
		.pipe(dest('./dist/img/'));
	done();
};

exports.s = bs;
exports.b = series(buildCSS, buildJS, html, php, fonts, imgmin);