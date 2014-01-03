module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: {
                    'dist/ember-admin.js': [
                      'src/application/resolver.coffee',
                      'src/application/app.coffee',
                      'src/application/namespace.coffee',
                      'src/application/dsl/*.coffee',
                      'src/application/logics/*.coffee',
                      'src/application/mixins/**/*.coffee',
                      'src/application/routes/main_route.coffee',
                      'src/application/config.coffee',
                      'src/application/views/base/actions/base_action_view.coffee',
                      'src/application/controllers/base/admin_base_controller.coffee',
                      'src/application/controllers/base/admin_table_view_controller.coffee',
                      'src/application/forms/*.coffee',
                      'src/application/helpers/*.coffee',
                      'src/application/views/**/*.coffee',
                      'src/application/routes/**/*.coffee',
                      'src/application/controllers/**/*.coffee',
                      'src/application/form_config.coffee',
                      'src/application/adapters/*.coffee'
                    ]
                }
            }
        },

        emblem: {
            compile: {
                files: {
                    'dist/templates.js': ['src/application/templates/ember-admin/**/*.emblem']
                },
                options: {
                    root: 'src/application/templates/',
                    dependencies: {
                        jquery: 'vendor/jquery/jquery.js',
                        ember: 'vendor/ember/ember.js',
                        emblem: 'vendor/emblem/dist/emblem.js',
                        handlebars: 'vendor/handlebars/handlebars.js'
                    }
                }
            }
        },

        uglify: {
            options: { mangle: false, compress: false },

            dist: {
                src: ['src/ember-easyForm.js', 'vendor/jquery.cookie/jquery.cookie.js', 'dist/ember-admin.js', 'dist/templates.js'],
                dest: 'dist/ember-admin.min.js'
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/ember-admin.css': 'src/ember-admin.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-emblem');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('karma');
    grunt.loadTasks('tasks');

    grunt.registerTask('dist', ['coffee', 'emblem', 'uglify', 'sass']);
    grunt.registerTask('test', ['coffee', 'emblem', 'uglify', 'sass', 'karma:start']);
};
