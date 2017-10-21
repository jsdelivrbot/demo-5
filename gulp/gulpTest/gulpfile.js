var gulp=require('gulp');
var uglify=require("gulp-uglify");//压缩
var concat=require("gulp-concat");//合并
//var path={
//	scripts:["js/index.js","js/main.js"]
//}
gulp.task("default",function(){
	gulp.src("js/*.js")//来源文件 index,main
	.pipe(uglify())//压缩
	.pipe(concat("all.min.js"))//合并
	.pipe(gulp.dest("build"));//生成文件位置
})
