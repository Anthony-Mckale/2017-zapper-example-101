var grunt = require('grunt');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
  browserify: {
    dist: {
      options: {
        transform: [
          ['babelify', {presets: ['es2015', 'react']}]
        ]
      },
      src: [
        'babel/index.babel.jsx'
      ],
      dest: 'js/index.js'
    }
  },
  watch: {
    browserify: {
      files: ['babel/*.jsx'],
      tasks: ['browserify'],
      options: {
        spawn: false,
        livereload: true
        //livereload: {
        //  host: 'localhost',
        //  port: 9000
        //}
      }
    }
  }
});

grunt.registerTask('default', ['browserify', 'watch']);