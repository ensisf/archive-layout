"use strict";

var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  csso = require("gulp-csso"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  sass = require("gulp-sass"),
  rigger = require("gulp-rigger"),
  watch = require("gulp-watch"),
  notify = require("gulp-notify"),
  spritesmith = require("gulp.spritesmith"),
  browserSync = require("browser-sync"),
  rename = require("gulp-rename"),
  svgSprite = require("gulp-svg-sprite"),
  svgmin = require("gulp-svgmin"),
  cheerio = require("gulp-cheerio"),
  replace = require("gulp-replace"),
  rimraf = require("rimraf"),
  plumber = require("gulp-plumber"),
  reload = browserSync.reload,
  babel = require("gulp-babel"),
  stylelint = require("stylelint"),
  postcss = require("gulp-postcss"),
  reporter = require("postcss-reporter"),
  syntax_scss = require("postcss-scss"),
  realFavicon = require("gulp-real-favicon"),
  fs = require("fs"),
  // Stylelint config rules
  stylelintConfig = require("./stylelint.config.js");

var path = {
  build: {
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/",
    fonts: "build/fonts/",
  },
  src: {
    html: "src/*.html",
    js: "src/js/main.js",
    style: "src/sass/style.scss",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
    spriteImg: "src/img/images/",
    spriteSass: "src/sass/components/",
    spriteIcons: "src/design/icons/**/*.png",
    faviconImage: "src/design/favicon/favicon.png",
    faviconOutput: "src/img/images/favicon/",
    faviconIconsPath: "src/img/images/favicon/",
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/sass/**/*.scss",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "build/",
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == "production";

//browser-sync config
var config = {
  server: {
    baseDir: "./build",
  },
  tunnel: false,
  host: "localhost",
  port: 9000,
  logPrefix: "frontensis",
};

//error handler
var onError = function (err) {
  notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Beep",
  })(err);

  this.emit("end");
};

//==========clean==========//

gulp.task("clean", function (cb) {
  rimraf(path.clean, cb);
});

//==========html==========//

gulp.task("html:build", function () {
  gulp
    .src(path.src.html)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});

//==========js==========//

gulp.task("js:build", function () {
  gulp
    .src(path.src.js)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(
      babel({
        presets: [{ ignore: ["src/js/vendor/"] }, "es2015"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

//==========styles==========//

gulp.task("style:build", function () {
  gulp
    .src(path.src.style)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ["last 5 versions"] }))
    // .pipe(csso({ comments: false }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

//==========Sass linting==========//

gulp.task("scss-lint", function () {
  var processors = [
    stylelint(stylelintConfig),
    reporter({
      clearMessages: true,
      throwError: true,
    }),
  ];

  return gulp
    .src([
      "src/sass/**/*.scss",

      // Ignore linting vendors
      "!src/sass/vendors/**/*.scss",
      "!src/sass/components/_sprite.scss",
      "!src/sass/components/_svg_sprite.scss",
      "!src/sass/templates/**/*.scss",
    ])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(postcss(processors, { syntax: syntax_scss }));
});

gulp.task("style", ["style:build"]);

//==========favicon==========//

// File where the favicon markups are stored
var FAVICON_DATA_FILE = "faviconData.json";

gulp.task("favicon:build", function (done) {
  realFavicon.generateFavicon(
    {
      masterPicture: path.src.faviconImage,
      dest: path.src.faviconOutput,
      dest: path.src.faviconIconsPath,
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#da532c",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: "noChange",
          themeColor: "#ffffff",
          manifest: {
            name: "", //////////////////////site name
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: "silhouette",
          themeColor: "#5bbad5",
        },
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    }
  );
});

//==========images==========//

gulp.task("image:build", function () {
  gulp
    .src(path.src.img)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true,
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});

//==========rastr sprite==========//
gulp.task("sprite:build", function () {
  var spriteData = gulp
    .src(path.src.spriteIcons)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      spritesmith({
        imgName: "sprite.png", //sprite name
        cssName: "_sprite.scss", //sass file name
        imgPath: "../img/images/sprite.png", //the path where is sprite image after build
        cssFormat: "scss", //format
        padding: 5, // paddings between icons
      })
    );
  spriteData.img.pipe(gulp.dest(path.src.spriteImg)); // put sprite image
  spriteData.css.pipe(gulp.dest(path.src.spriteSass)); // put sprite stylesheet
});

//==========svg static design images==========//
gulp.task("svg-images:build", function () {
  gulp
    .src("src/design/svg/images/*.svg")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(svgmin({ js2svg: { pretty: true } })) //minify svg
    .pipe(replace("&gt;", ">")) //replace '&gt;'
    .pipe(gulp.dest("src/img/images/"));
});

//==========svg content images==========//

gulp.task("svg-pictures:build", function () {
  gulp
    .src("src/design/svg/pictures/*.svg")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(svgmin({ js2svg: { pretty: true } })) //minify svg
    .pipe(replace("&gt;", ">")) //replace '&gt;'
    .pipe(gulp.dest("src/img/pictures/"));
});

//==========svg sprite==========//

gulp.task("svg-sprite:build", function () {
  gulp
    .src("src/design/svg/icons/*.svg")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(svgmin({ js2svg: { pretty: true } })) //minify svg
    .pipe(
      cheerio({
        run: function ($) {
          // replace some attributes
          $("[fill]").removeAttr("fill");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&gt;", ">")) //replace '&gt;'
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite_symbol.svg",
            render: {
              scss: {
                dest: "../../../sass/components/_svg_sprite.scss",
                template: "src/sass/templates/_svg_sprite_template.scss",
              },
            },
          },
        },
      })
    )
    .pipe(
      cheerio(function ($) {
        $("svg").attr("style", "display:none");
      })
    )
    .pipe(gulp.dest("src/img/images/"));
});

//==========svg==========//

gulp.task("svg:build", [
  "svg-images:build",
  "svg-sprite:build",
  "svg-pictures:build",
]);

//==========fonts==========//

gulp.task("fonts:build", function () {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

//==========build==========//

gulp.task("build", [
  "html:build",
  "js:build",
  // 'scss-lint',
  "style",
  "fonts:build",
  "image:build",
]);

//==========watch==========//

gulp.task("watch", function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start("html:build");
  });
  watch([path.watch.style], function (event, cb) {
    gulp.start("style");
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start("js:build");
  });
  watch([path.watch.img], function (event, cb) {
    gulp.start("image:build");
  });
  watch([path.watch.fonts], function (event, cb) {
    gulp.start("fonts:build");
  });
});

//==========webserver==========//

gulp.task("webserver", function () {
  browserSync(config);
});

//==========default==========//

gulp.task("default", ["build", "webserver", "watch"]);

//const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'production';
//Константа відповідає за зборку проекту для продакшена або дева
//За замовчуванням - дев
//Щоб запустити зборку продакшена - в консолі set NODE_ENV=production gulp style:build
//Щоб вернути назад - в консолі set NODE_ENV=
