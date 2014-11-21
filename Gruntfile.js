
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-traceur-simple');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['traceur']);
  grunt.registerTask('serve', ['connect', 'watch']);

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/**/*.js', 'Gruntfile.js', 'dist/client/index.html'],
        tasks: ['build'],
        options: {
          spawn: false,
          debounceDelay: 250,
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: __dirname + '/dist/client/',
          port: 6969
        }
      }
    },
    traceur: {
      options: {
        includeRuntime: true,
        traceurOptions: '--experimental --source-maps'
      },
      all: {
        files: {
          'dist/client/responsize.js': ['src/index.js'],
        }
      }
    }
  });
}
