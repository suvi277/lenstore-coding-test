const sass = require('node-sass');

module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
        server: {
          options: {
            port: 8080,
            base: './'
          }
        }
      },
    sass: {
      dist: {                            
        options: {
          implementation: sass,             
          style: 'expanded'
        },
        files: {
          'app/css/main.css' : 'src/sass/main.scss',
          'app/css/form.css' : 'src/sass/form.scss',
          'app/css/progress.css' : 'src/sass/progress.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/scripts/*.js'],
        dest: 'app/js/app.js'
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/data/',
          src: '**',
          flatten: true,
          dest: 'app/data/',
        },{
          expand: true,
          cwd: 'src/scripts/',
          src: 'form.js',
          flatten: true,
          dest: 'app/js/',
        }]
      }
    },
    watch: {
      styles:{
        options:{
          livereload: true,
          spawn: false,
          event: ['added','deleted','changed']
        },
        files:['**/*.scss', 'src/scripts/*.js', '**/*.json'],
        tasks:['sass', 'concat', 'copy']
      }
    },
    jasmine: {
        test: {
            src: 'src/scripts/*.js',
            options: {
                specs: 'src/scripts/tests/*.spec.js'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['connect:server', 'concat', 'sass', 'copy', 'watch']);
};
