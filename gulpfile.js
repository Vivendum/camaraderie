import gulp from "gulp";
import error_signal from "gulp-plumber";
import error_ring from "gulp-notify";
import html_compile from "gulp-nunjucks-render";

// Setting

import path from "./setting/path.json" with {type: "json"};
import config_nunjucks from "./setting/config-nunjucks.json" with {type: "json"};

// Error

export const error_warning = () => {
  return error_signal({
    errorHandler(error) {
      error_ring.onError({
        title: "Compilation error",
        message: "Look in the console",
        sound: "beep"
      })(error);
      console.log(
        error.toString()
      )
    }
  })
};

// Page

export const build_html = () => {
  return gulp.src(path.page.take.initial)
    .pipe(error_warning())
    .pipe(html_compile({
      path: path.page.take.template,
      envOptions: config_nunjucks //  Разобраться как настроить throwOnUndefined
    }))
    .pipe(gulp.dest(path.page.build.gap));
};

// Instruction

export const build =
  gulp.parallel(
    build_html
);
