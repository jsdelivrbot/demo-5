/*
 * gulp plugins project
 */
'use strict';
// 引入 gulp 模块
var gulp         = require("gulp");
// 引入 sass 模块
var sass         = require("gulp-sass");
//引入 less
var less         = require("gulp-less");
//css 压缩
var cleanCSS     = require("gulp-clean-css");
//文件合并
var concat       = require("gulp-concat");
//js 文件压缩
var minJs        = require("gulp-uglify");
//重命名
var rename       = require("gulp-rename");
//css 后编译
var postcss      = require('gulp-postcss');
//css 属性前缀
var autoprefixer = require('autoprefixer');
//后编译模块压缩 处理 css
//var cssnano      = require('cssnano');
//压缩图片
var imagemin     = require('gulp-imagemin');
//压缩html
var htmlmin      = require('gulp-htmlmin');
//保存自动更新浏览器
var browserSync = require('browser-sync').create();
//任务完成后调用reload
var reload      = browserSync.reload;

var path = {
	"src" : {
		"css" : [
			"./src/**/**.scss"
		],
		"js" : [
			"./src/**/**.js"
		],
		"html" : [
			"./src/**/**.html",
		],
		"img" : [
			"./src/**/**.jpg",
			"./src/**/**.png",
			"./src/**/**.jpeg",
			"./src/**/**.gif"
		],
		"fonts" :[
			"./src/**/**.ttf",
		]
	},
	"dist" : "./public",
	"views":"./views"
}
//scss 事件任务
gulp.task("scss",function(){
	 var plugins = [
	        autoprefixer({
            browsers: ['last 5 versions', 'Android >= 4.0'],
            cascade: false, //是否美化属性值 默认：true 像这样：
            remove:false //是否去掉不必要的前缀 默认：true
        })
//	        cssnano()//压缩css
	    ];
	return gulp.src(path.src.css)
		//监听 scss 语法错误
        .pipe(sass().on('error', sass.logError))
        //所有文件合并，并传入新文件的名字
//      .pipe(concat("min.css"))
		//后编译处理自动前缀
        .pipe(postcss(plugins))
        //将每个css压缩成单个文件
//      .pipe(cleanCSS())
        //输出到指定目录
        .pipe(gulp.dest(path.dist))
});


gulp.task("js",function(){
	//把需要合并压缩的 js 文件列出来
	return gulp.src(path.src.js)
//		.pipe(concat('all.js'))//将所有 js合并并且重命名为min.js
//		.pipe(minJs())  	   //压缩 js
//		.pipe(rename('all.min.js'))//更改文件名，concat即可重命名，可以不用
		.pipe(gulp.dest(path.dist)); //输出js
});

gulp.task("html",function(){
	//把需要合并压缩的 html文件列出来
	return gulp.src(path.src.html)
//		.pipe(htmlmin({collapseWhitespace: true}))//压缩html
		.pipe(gulp.dest(path.views)); //输出html
});

gulp.task("img",function(){
	//把需要合并压缩的图片 文件列出来
	gulp.src(path.src.img)
//		.pipe(imagemin())//压缩图片
		.pipe(gulp.dest(path.dist)); //输出图片
});

gulp.task("fonts",function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist)); //输出图片
});

//打包静态文件
gulp.task("build",["scss","js","html","img","fonts"]);

//添加一个默认任务
//执行默认任务时 先 执行 css 任务
gulp.task("default",["build"],function(){
	browserSync.init({
        proxy: "http://127.0.0.1:3040"
    });
	//监听文件修改
	//当监听到文件修改会触发相应的任务事件
	gulp.watch(path.src.css,["scss"]).on('change', reload);

	gulp.watch(path.src.js,["js"]).on('change', reload);

	gulp.watch(path.src.html,["html"]).on('change', reload);

	gulp.watch(path.src.img,["img"]).on('change', reload);

	gulp.watch(path.src.img,["fonts"]).on('change', reload);
});
