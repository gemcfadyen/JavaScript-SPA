module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['js/lib/*.js', 'js/app/*.js'],
            options: {
                //options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint'); /* go and find in the node-modules folder and integrate in */
    grunt.loadNpmTasks('grunt-contrib-watch'); /* these two libs need installed using npm */
    grunt.registerTask('default', ['jshint']);
};