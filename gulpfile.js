const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');

const config = {
    host: 'nlss5.a2hosting.com',
    port: 7822,
    username: 'upboostn',
    password: 'ERP9d#DiVO{v',
};

const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

gulp.task('deploy', function() {
    return gulpSSH
        .shell([
            'cd ~/bestonlinemenus.dev.etcetera.kiev.ua',
            'cd front',
            'git pull "https://vladimir_t:vladimir123@gitlab.com/etcetera-agency/bestonlinemenus-front.git" develop',
            'npm install',
            'npm run build',
        ], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'))
});
