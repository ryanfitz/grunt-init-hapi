'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['index.js', 'bin/server', 'bin/worker', 'lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'simplemocha']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'simplemocha']
      }
    },

    mochaTest: {
      test: {
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd',
          reporter: 'list'
        },
        src: ['<%= jshint.test.src %>']
      }
    },

    nodemon: {
      server: {
        options: {
          file: 'bin/server',
          args: ['-c', 'config/development.json'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js', 'json'],
          watchedFolders: ['lib', 'config'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon:server'],
        options: {
          limit: 4,
          logConcurrentOutput: true
        }
      }
    }

  });

    // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('server', ['concurrent:dev']);
    // Default task.
  grunt.registerTask('default', ['jshint', 'test']);
};
