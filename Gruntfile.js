module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Tasks
    sass: { // Begin Sass Plugin
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['*.scss'],
          dest: 'src/css',
          ext: '.css'
      }]  
      }
    },
    postcss: { // Begin Post CSS Plugin
      options: {
        map: false,
        processors: [
      require('autoprefixer')({
            browsers: ['last 2 versions']
          })
    ]
      },
      dist: {
        src: 'src/css/style.css'
      }
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
    }]
      }
    },
    uglify: { // Begin JS Uglify Plugin
      build: {
        files: [{
              expand: true,
              cwd: 'src/js/',
              src: ['*.js', '!*.min.js'],
              dest: 'js/',
              ext: '.min.js'
        }]
      }
    },
    connect : {
      server: {
        options: {
          hostname: 'localhost',
          port: '8001',
          livereload: true
        }
      }
    },
    watch: { // Compile everything into one task with Watch Plugin
      options: {
        livereload: true,
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin']
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify']
      },
      html: {
        files: ['*.html']
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: false
        },
        silent: false
      },
      files: ['test/*_test.js']
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-casperjs');

  // Register Grunt tasks
  grunt.registerTask('serveApp', ['connect:server', 'casperjs', 'watch']);

};