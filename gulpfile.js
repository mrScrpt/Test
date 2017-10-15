const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const ftp = require('gulp-ftp');

var config = {
    src: './src',
    build: './build',    
    host: '193.0.61.47',
    user: 'chosvob6128',
    pass: 'df25c3cbc3',
    html: {
        src: '/*.html',
        dest: '/'
    },
    fonts: {
        src: '/fonts/*',
        dest: '/fonts/',
        out: '/fonts/'
    },
    js: {
        src: '/js/*',
        dest: '/js/',
        out: '/js/'
    },
    img: {
        src: '/img/*',
        dest: '/img/',
        out: '/img/'
    },
    imgBg: {
        src: '/styl/img/*',
        dest: '/css/img/',
        out: '/css/img/'
    },
    css: {
        src: '/css/*',
        dest: '/css/',
        out: '/css/'
    },
    preproc: {
        watch: '/styl/**/*.styl',
        src: '/styl/style.styl',
        dest: '/css/'
    },
    server: {
        path: 'www/xn--90abheadq3bdbb6a.com.ua',
        url: 'http://chosvob6128.focus.chost.com.ua/'

    }
};





gulp.task('html', function(){
    gulp.src(config.src + config.html.src)
        .pipe(gulp.dest(config.build + config.html.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function(){
    gulp.src(config.src + config.fonts.src)
        .pipe(gulp.dest(config.build + config.fonts.dest));
});




gulp.task('img', function(){
    gulp.src(config.src + config.img.src)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.build + config.img.dest));
});

gulp.task('imgBg', function(){
    gulp.src(config.src + config.imgBg.src)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.build + config.imgBg.dest));
});

gulp.task('js', function(){
    gulp.src(config.src + config.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.build + config.js.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css', function(){
    gulp.src(config.src + config.css.src)
        .pipe(concat('modules.css'))
        .pipe(sourcemaps.init())        
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.build + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});



gulp.task('del', function(){
    let path = config.build + '/*';
    
    if(path.substr(0, 1) === '/'){
        console.log("never delete files from root :)");
    }
    else{
        del.sync(path);
    }
});
    
gulp.task('clean', ['del', 'html', 'fonts', 'img', 'imgBg', 'js', 'css', 'preproc'], function(){   
    
});



gulp.task('all', ['html', 'fonts', 'img', 'imgBg', 'js', 'css', 'preproc'], function(){   
    
});

gulp.task('preproc', function(){
   gulp.src(config.src + config.preproc.src)
       .pipe(preproc())
       .pipe(gcmq())
       .pipe(sourcemaps.init())
       .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
       }))
       .pipe(cleanCSS({
           level: 2
       }))
       .pipe(sourcemaps.write('.'))
       .pipe(gulp.dest(config.build + config.preproc.dest))
       .pipe(browserSync.reload({
            stream: true
        }));
});


// Локальный Вотчер
gulp.task('watch', ['all','browserSync'], function(){
    gulp.watch(config.src + config.preproc.watch, ['preproc']);
    gulp.watch(config.src + config.html.src, ['html']);
    gulp.watch(config.src + config.js.src, ['js']);
    gulp.watch(config.src + config.imgBg.src, ['imgBg']);
    gulp.watch(config.src + config.img.src, ['img']);    
    gulp.watch(config.src + config.fonts.src, ['fonts']);    
});

// Вотчер под сервер
gulp.task('rem', function(){
    gulp.watch(config.src + config.preproc.watch, ['preproc', 'ftpMoveCSS']);
    gulp.watch(config.src + config.js.src, ['js' , 'ftpMoveJs']);
    gulp.watch(config.src + config.imgBg.src, ['imgBg' , 'ftpMoveImgBg']);
    gulp.watch(config.src + config.img.src, ['img' , 'ftpMoveImg']);
    gulp.watch(config.src + config.fonts.src, ['fonts' , 'ftpMoveFonts']); 
});


//перенос файлов на сервер

gulp.task('ftpMoveCSS', function () {
    return gulp.src(config.build + config.css.src)
        .pipe(ftp({
            host: 'focus.cityhost.com.ua',
            user: 'chosvob6128',
            pass: 'T123wer911Big',
            remotePath: config.server.path + config.css.out
            }))
        
});

gulp.task('ftpMoveJs', function () {
    return gulp.src(config.build + config.js.src)
        .pipe(ftp({
            host: 'focus.cityhost.com.ua',
            user: 'chosvob6128',
            pass: 'T123wer911Big',
            remotePath: config.server.path + config.js.out
            }))
        
});

gulp.task('ftpMoveImgBg', function () {
    return gulp.src(config.build + config.imgBg.src)
        .pipe(ftp({
            host: 'focus.cityhost.com.ua',
            user: 'chosvob6128',
            pass: 'T123wer911Big',
            remotePath: config.server.path + config.imgBg.out
            }))
        
});

gulp.task('ftpMoveImg', function () {
    return gulp.src(config.build + config.img.src)
        .pipe(ftp({
            host: 'focus.cityhost.com.ua',
            user: 'chosvob6128',
            pass: 'T123wer911Big',
            remotePath: config.server.path + config.img.out
            }))
        
});

gulp.task('ftpMoveFonts', function () {
    return gulp.src(config.build + config.fonts.src)
        .pipe(ftp({
            host: 'focus.cityhost.com.ua',
            user: 'chosvob6128',
            pass: 'T123wer911Big',
            remotePath: config.server.path + config.fonts.out
            }))
        
});







//Локальный
gulp.task('browserSync', function(){
   browserSync.init({
        server: {
            baseDir: config.build
        }
    })
});

//серверный
gulp.task('browserSyncServer', function(){
    browserSync.init({
        proxy: 'http://chosvob6128.focus.chost.com.ua/', // проксирование вашего удаленного сервера
        host:  'chosvob6128.focus.chost.com.ua/',
        port: 3000,
        open: 'external'
        
    });    
});


