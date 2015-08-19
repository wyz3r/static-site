module.exports = function(grunt) {
  grunt.initConfig({

  });

  grunt.loadNpmTasks('grunt-bower');

  grunt.config('bower', {
    dev: {
      dest: 'public/resources/',
      js_dest: 'public/scripts/libs',
      css_dest: 'public/styles',
      options: {
        keepExpandedHierarchy: false,
        packageSpecific: {
          'bootstrap': {
            files: [
							'dist/css/bootstrap.css',
							'fonts/*',
              'dist/js/bootstrap.js'
						],
            js_dest: 'public/scripts/libs',
            css_dest: 'public/styles',
            dest: 'public/fonts'
          }
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.config('sass', {
    dev: {
      options: {
        style: 'expanded'
      },
      files: {
        './public/styles/site.css': './client/styles/site.sass'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.config('jade', {
    compile: {

      options: {
        client: false,
        pretty: true,
      },
      files: [{
        cwd: 'client/jade',
        src: '**/*jade',
        dest: 'public',
        expand: true,
        ext: '.html'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.config('clean', {
    main: ['public']
  });

  grunt.loadNpmTasks('grunt-express-server');

  grunt.config('express', {
    web: {
      options: {
        host: 'localhost',
        script: 'backend/app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.config('watch', {
		scripts: {
			files: ['client/**/*.js'],
			tasks: ['jshint:client', 'copy']
		},
		html: {
			files: ['client/**/*.jade'],
			tasks: ['jade']
		},
		libs: {
			files: ['bower.json', 'Gruntfile.js'],
			tasks: ['bower']
		},
		styles: {
			files: ['client/**/*.sass'],
			tasks: ['sass']
		}
	});


  grunt.registerTask('default', ['clean:main','bower:dev','jade:compile','express:web','watch']);
};
