import gulp from 'gulp';
import EventEmitter from 'events';

/**
 * -- TOP LEVEL FUNCTIONS --
 * gulp.task - Define tasks
 * gulp.src - point tofiles to use
 * gulp.dest - points to folder to output
 * gulp.watch - watch files and folders for changes
 */

// Logs Message
gulp.task('travis', function() {
    const e = new EventEmitter();
    e.on('travis', () => {
        gulp.src(['build','modules/test/*'])
            .pipe(gulp.dest('dist'));
    });
    setTimeout(() => { e.emit('travis', 'Gulp is running...'); e.emit('finish'); });
    return e;
});