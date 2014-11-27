
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower');

  // js
  grunt.loadNpmTasks('grunt-closure-tools');
  
  // css
  require('load-grunt-tasks')(grunt);

  // html
  grunt.loadNpmTasks('grunt-contrib-jade');

 

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['bower', 'jade', 'sass', 'closureCompiler']);
  grunt.registerTask('serve', ['connect', 'watch']);

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/client/responsize.css': 'src/**/*.scss'
        }
      }
    },
    closureCompiler:{
      options: {
        compilerFile: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
        checkModified: false,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          jscomp_error: ['accessControls', 'ambiguousFunctionDecl', 'checkRegExp', 'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicateMessage', 'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'],
          warning_level: 'VERBOSE',
          create_source_map: 'dist/client/responsize.js.map',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT3',
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
      options: {
        livereload: true
      },
      js: {
        files: ['src/**/*.js', 'Gruntfile.js'],
        tasks: ['closureCompiler']
      },
      html: {
        files: ['src/**/*.jade', 'Gruntfile.js'],
        tasks: ['jade']
      },
      sass: {
        files: ['src/**/*.scss', 'Gruntfile.js'],
        tasks: ['sass']
      }
    },
    jade: {
      compile: {
        options: {
        },
        files: {
          'dist/client/index.html': 'src/index.jade'
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
