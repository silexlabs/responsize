
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['bower', 'closureCompiler']);
  grunt.registerTask('serve', ['connect', 'watch']);

  grunt.initConfig({
    closureCompiler:{
      options: {
        compilerFile: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
        checkModified: false,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          warning_level: 'VERBOSE',
          create_source_map: 'dist/client/responsize.js.map',
          language_in: 'ECMASCRIPT6_STRICT',
          source_map_format: 'V3',
          debug: false
        },
        namespaces: 'rsz'
      },
      all: {
        src: 'src/**/*.js',
        dest: 'dist/client/responsize.js'
      }
    },
    bower: {
      dev: {
        dest: 'dist/client/libs',
        options: {
          expand: true,
          ignorePackages: ['closure-compiler'],
          keepExpandedHierarchy: false,
        }
      }
    },
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
    }
  });
}
