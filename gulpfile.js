var gulp = require('gulp');
var pkg = require('./package.json')
var _tool = require('gulp-load-plugins')();
//添加私有前缀
gulp.task('autoFx', function() {
	gulp.src('src/**/*.css')
		.pipe(_tool.autoprefixer({
			browsers: ['> 5%'],
			cascade: true, //是否美化属性值 默认：true 
			remove: true //是否去掉不必要的前缀 默认：true 
		}))
		.pipe(gulp.dest('src'));
});
//js代码检查
gulp.task('jshint', function() {
	gulp.src('src/js/*.js')
		.pipe(_tool.jshint('jshint.json'))
		.pipe(_tool.jshint.reporter());
});
//css代码检查,依赖于前缀添加
gulp.task('csslint', ['autoFx'], function() {
	gulp.src('src/css/*.css')
		.pipe(_tool.csslint('csslint.json'))
		.pipe(_tool.csslint.reporter());
});
//js合并 依赖于js代码检查
gulp.task('js', ['jshint'], function() {
	gulp.src('src/js/*.js')
		.pipe(_tool.concat(pkg.name + '.js'))
		.pipe(gulp.dest('dist/'));
});
//合并css依赖于css检查
gulp.task('css', ['csslint'], function() {
	gulp.src('src/**/*.css')
		.pipe(_tool.concatCss(pkg.name + '.css'))
		.pipe(gulp.dest('dist/'));
});
//压缩js 依赖于js合并
gulp.task('compress-js', ['js'], function() {
	setTimeout(function(){
		gulp.src('dist/*.js')
			.pipe(_tool.uglify())
			.pipe(_tool.rename({
				extname: '.min.js'
			}))
			.pipe(gulp.dest('dist/'));
	},1000);
});
//压缩css 依赖于css合并
gulp.task('compress-css', ['css'], function() {
	setTimeout(function(){
		gulp.src('dist/*.css')
			.pipe(_tool.cleanCss())
			.pipe(_tool.rename({
				extname: '.min.css'
			}))
			.pipe(gulp.dest('dist/'));
	},1000);
});
gulp.task('default', ['autoFx', 'csslint', 'jshint', 'css', 'js', 'compress-css', 'compress-js'], function() {
	gulp.watch('src/**/*.css', function() {
		gulp.run('csslint');
	});
	gulp.watch('src/**/*.js', function() {
		gulp.run('jshint');
	});
});