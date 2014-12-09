
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower-task');

  // js
  grunt.loadNpmTasks('grunt-closure-tools');

  // css
  require('load-grunt-tasks')(grunt);

  // html
  grunt.loadNpmTasks('grunt-contrib-jade');

  // tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['bower', 'jade', 'sass', 'closureCompiler', 'append-sourcemapping']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.loadNpmTasks('grunt-append-sourcemapping');

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/responsize.css': 'src/index.scss'
        }
      }
    },
    closureCompiler:{
      options: {
        compilerFile: 'build/closure-compiler.jar',
        checkModified: false,
        compilerOpts: {
          process_closure_primitives: '',
          generate_exports: '',
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          jscomp_error: ['accessControls', 'ambiguousFunctionDecl', 'checkRegExp', 'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicateMessage', 'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'],
          warning_level: 'VERBOSE',
          create_source_map: 'dist/responsize.js.map',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT3',
          source_map_format: 'V3',
          debug: false,
          externs: 'build/externs.js'
        },
        namespaces: 'rsz'
      },
      all: {
        src: 'src/**/*.js',
        dest: 'dist/responsize.js'
      }
    },
    bower: {
      all: {
        options: {
          targetDir: 'dist/lib',
          copy: true
        }
      }
    },
    "append-sourcemapping": {
      main: {
        files: {
          "dist/responsize.js": "responsize.js.map"
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['src/**/*.js', 'build/externs.js', 'Gruntfile.js'],
        tasks: ['closureCompiler', 'append-sourcemapping']
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
          'dist/index.html': 'src/index.jade'
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: false,
          base: __dirname + '/dist/',
          port: 6969
        }
      }
    }
  });
}
