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
    less: {
      development: {
        options: {
          paths: ["app/css"]
        },
        files: [{
                  src: "src/less/main.less",
                  dest: "app/css/main.css"
                },{
                  src: "src/less/form.less",
                  dest: "app/css/form.css"
                }]
      },
      watch: {
        files: "*.less",
        tasks: ["less"]
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
    uglify : {
      options : {
        banner : "/*! app.min.js file */\n"
      },
      build : {
        src : ["app/js/app.js"],
        dest : "app/js/app.min.js"
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
        files:['**/*.less', 'src/scripts/*.js', '**/*.json'],
        tasks:['less', 'concat', 'uglify', 'copy']
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['connect:server', 'concat', 'uglify', 'less', 'copy', 'watch']);
  grunt.registerTask('test', ['jasmine']);
};
