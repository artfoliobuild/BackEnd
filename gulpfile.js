var gulp = require("gulp");
// var less = require("gulp-less");
// var babel = require("gulp-babel");
// var concat = require("gulp-concat");
// var uglify = require("gulp-uglify");
// var rename = require("gulp-rename");
// var cleanCSS = require("gulp-clean-css");
// var del = require("del");

gulp.task("travis", ["build", "testServerJS"], () => process.exit(0));
//
