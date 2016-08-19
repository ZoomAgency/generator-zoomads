'use strict';

var moment = require('moment');

var paths = {
  src: 'app',
  dest: '../dist' + 'foldername',
  runtime: '.runtime',
  vendor: 'bower_components'
};

module.exports = {
  clean: {
    src: [paths.runtime, paths.dest]
  },
  lint: {
    js: {
      src: paths.src + '/scripts/**/*.js'
    },
    sass: {
      src: paths.src + '/styles/**/*.scss'
    },
    css: {
      src: paths.src + '/styles/**/*.css'
    },
    html: {
      src: paths.src + '/**/*.html'
    }
  },
  compile: {
    sass: {
      src: paths.src + '/styles/main.scss',
      dest: paths.runtime + '/css',
      output: 'main.css',
      options: {
        style: 'nested',
        precision: 10,
        errLogToConsole: false,
        output: 'main.css'
      }
    },
    js: {
      src: paths.src + '/scripts/main.{js,jsx}',
      dest: paths.runtime + '/js',
      output: 'main.js'
    },
    images: {
      src: paths.src + '/images/**/*',
      dest: paths.runtime + '/images'
    },
    fonts: {
      src: paths.src + '/fonts/*',
      dest: paths.runtime + '/fonts'
    }
  },
  optimize: {
    images: {
      src: paths.runtime + '/images/**/*',
      dest: paths.dest + '/images',
      options: {
        progressive: true,
        interlaced: true
      }
    },
    css: {
      src: paths.runtime + '/css/main.css',
      dest: paths.dest + '/css',
      options: {
        html: [paths.src + '/**/*.html']
      }
    },
    js: {
      src: paths.runtime + '/js/main.js',
      dest: paths.dest + '/js'
    },
    html: {
      src: paths.src + '/**/*.html',
      dest: paths.dest,
      options: {
        collapseWhitespace: true
      }
    }
  },
  copy: {
    files: {
      src: [paths.src + '/*'],
      dest: paths.dest
    },
    fonts: {
      src: paths.runtime + '/fonts/*',
      dest: paths.dest + '/fonts'
    }
  },
  release: {
    rev: {
      base: {
        src: paths.dest
      },
      html: {
        src: paths.dest + '/**/*.html'
      },
      assets: {
        src: [paths.dest + '/fonts/*', paths.dest + '/images/**/*', paths.dest + '/css/**/*.css', paths.dest + '/js/**/*.js']
      },
      dest: paths.dest,
      options: {
        prefix: project.baseurl || ''
      }
    },
    zip: {
      src: paths.dest + '/**/*',
      dest: paths.dest,
      output: project.name + '-' + moment().format('YYYY-MM-DD_HHmmss') + '.zip'
    }
  }
};
