import gulp from "gulp";
import html_compile from "gulp-nunjucks-render";

// Setting

import path from "./setting/path.json" with {type: "json"};

// Page

export const build_html = () => {
  return gulp.src(path.page.take.initial)
    .pipe(html_compile({
      path: path.page.take.template
    }))
    .pipe(gulp.dest(path.page.build.gap));
};

// Instruction

export const build =
  gulp.parallel(
    build_html
);
