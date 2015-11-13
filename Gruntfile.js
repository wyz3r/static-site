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
          'bootswatch-dist': {
						css_dest: 'public/styles',
						dest: 'public/fonts'
					},
          fontawesome: {
						files: [
							'css/font-awesome.css',
							'fonts/*'
						],
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
    },
    deploy: {
      options: {
        style: 'compressed'
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
        data: function(dest, src) {
					return {
						development : true
					};
				}
      },
      files: [{
        cwd: 'client/jade',
        src: '**/*jade',
        dest: 'public',
        expand: true,
        ext: '.html'
      }]
    },
    deploy: {

			options: {
				client: false,
				pretty: false,
				data: function(dest, src) {
					return {
						development : false
					};
				}
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
      tasks: ['jade:compile'],
      options: {
        livereload: {
          port: 35729
        }
      }
    },
    libs: {
      files: ['bower.json', 'Gruntfile.js'],
      tasks: ['bower']
    },
    styles: {
      files: ['client/**/*.sass'],
      tasks: ['sass'],
      options: {
        livereload: {
          port: 35729
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.config('copy', {
		main: {
			files: [{
				expand: true,
				src: '**/*',
				dest: 'public/fonts',
				cwd: 'art/fonts'
			}]
		},scripts:{
      files: [{
        expand:true,
        src:'**/*.js',
        dest:'public/js',
        cwd:'client/js'
      }]
    }



	});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    app :['Gruntfile.js', 'app/**/*.js', ],
    client: ['client/js/**/*.js', '!client/js/libs/**/*.js']
  });



  grunt.loadNpmTasks('grunt-contrib-uglify');





  grunt.registerTask('default', ['clean:main', 'bower:dev'   , 'jade:compile' , 'sass:dev','copy', 'express:web', 'watch']);

  grunt.registerTask('deploy' , ['clean:main', 'jade:deploy' , 'sass:deploy'  , 'copy']);
};
