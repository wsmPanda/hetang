var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('default',['startServer'], () => {
	
})

gulp.task('startServer', () => {
	nodemon({
		script: 'app.js',
		ignore: [
			"public/**"
		]
	})
})