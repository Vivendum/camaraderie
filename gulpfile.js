import gulp from "gulp";
import error_signal from "gulp-plumber";
import error_ring from "gulp-notify";
import html_compile from "gulp-nunjucks-render";
import html_lint from "gulp-htmlhint";
import html_valid from "gulp-html";
import html_min from "gulp-html-minifier-terser";

// Setting

import path from "./setting/path.json" with {type: "json"};
import config_nunjucks from "./setting/config-nunjucks.json" with {type: "json"};
import config_htmlhint from "./setting/config-htmlhint.json" with {type: "json"};
import config_vnu from "./setting/config-vnu.json" with {type: "json"};
import config_htmlminifier from "./setting/config-htmlminifier.json" with {type: "json"};

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
      envOptions: config_nunjucks
    }))
    .pipe(gulp.dest(path.page.build.gap));
};

// Check

export const lint_html = () => {
  return gulp.src(path.page.check.gap)
    .pipe(html_lint(config_htmlhint))
    .pipe(html_lint.reporter());
};

export const valid_html_from_gap = () => {
  return gulp.src(path.page.check.gap)
    .pipe(html_valid(config_vnu));
};

// Optimize

export const min_html = () => {
  return gulp.src(path.page.check.gap)
    .pipe(html_min(config_htmlminifier)) // Настроить minifyCSS, minifyJS и minifyURLs
    .pipe(gulp.dest(path.page.build.end))
};

// Instruction

export const lint =
  gulp.parallel(
    lint_html
);

export const valid =
  gulp.series(
    valid_html_from_gap
);

export const optimize =
  gulp.series(
    min_html
);

export const build =
  gulp.parallel(
    build_html
);

// заменить check на более смысловой fix
