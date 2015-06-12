/* gulpfile.js */

// Load some modules which are installed through NPM.
var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');  // Bundles JS.

var source = require('vinyl-source-stream');
var chalk = require('chalk');
var notifier = require('node-notifier');
var uglify = require('gulp-uglify');

// Define some paths.
var paths = {
    app_js: ['./src/index.js'],
    js: ['./src/**/*.js*']
};

function notiErr(err){
    var notiConf = {};
    if(err){
        notiConf = {
            message: "Error: " + err.message.slice(0,30),
            title: "Failed running browserify",
            icon: path.join(__dirname, 'fail.png')
        };
    }else{
        notiConf = {
            message: "You just fixed it!",
            title: "Resolved",
            icon: path.join(__dirname, 'approved.png')
        };
    }
    notifier.notify(notiConf);
}


var isOnErrorState = false;
gulp.task('compile', function() {
    return browserify({ debug: false })
        //.transform(babelify)
        .require(paths.app_js, { entry: true })
        .bundle(function(err,bff){
            if(bff){
                if(isOnErrorState){
                    notiErr(false)
                }
                isOnErrorState = false;
            }
        })
        .on("error", function (err) {
            console.log(chalk.red(err.toString()));
            this.emit('end');
            if(!isOnErrorState){
                notiErr(err);
            }
            isOnErrorState = true;

        })
        //.pipe(uglify())
        .pipe(source('psd3.pack.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uglify', function(){
        return gulp.src(jss)
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(concat('all.min.js'))
            .pipe(sourcemaps.write('./', {//故意写死，请勿修改
                sourceMappingURLPrefix: 'http://vg-static.patsnap.com/jobs/landscape/dist/release/js/'
            }))
            .pipe(gulp.dest(output+'/js'));
    });

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
    return gulp.watch(paths.js, ['js']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js','watch']);