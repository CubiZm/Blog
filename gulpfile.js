"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
// var cmq = require('gulp-combine-media-queries');
var combineMq = require("gulp-combine-mq");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rimraf = require('rimraf');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

var scriptList = [
	'source/js/common.js'
]

gulp.task("build",["style", "images", "script", "html", "fonts"]);

gulp.task("style", function() {
	return gulp.src("source/sass/style.{sass,scss}")
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded'
		})).on('error', sass.logError)
		.pipe(postcss([
			autoprefixer({browsers: "last 2 versions"})
		]))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(minifyCss())
		.pipe(rename({
				suffix: ".min"
		}))
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream());
});

gulp.task("images", function() {
	return gulp.src("source/img/*.{png,jpg,gif,svg}")
		.pipe(imagemin())
		.pipe(gulp.dest("build/img"));
});

gulp.task('script', function() {
	return gulp.src(scriptList)
		.pipe(concat('common.js'))
		.pipe(gulp.dest('./build/js/'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./build/js'));
});

gulp.task("html", function() {
	return gulp.src("source/jade/*.jade")
		.pipe(jade())
		.pipe(gulp.dest("build/"));
});

gulp.task("fonts", function() {
	return gulp.src("./source/fonts/*.otf")
		.pipe(gulp.dest("build/fonts/"));
});

gulp.task('clean', function (cb) {
return rimraf('build', cb);
});


gulp.task("start", function() {
	gulp.watch("sass/**/*.{sass,scss}", ["style"]);
	gulp.watch("jade/*.jade"), ["jade"];
	});

gulp.task('jade', function() {

	gulp.src('./jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./'))
		// gulp.watch("jade/*.jade"), ["jade"];
});

// Static Server + watching scss/html files
gulp.task('server', ['style'], function() {

		browserSync.init({
				server: "./",
				open: false
		});

		gulp.watch("sass/**/*.scss", ['style']);
		gulp.watch("jade/*.jade"), ["jade"];
		gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);


