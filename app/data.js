'use strict';

module.exports = {
  platforms: [{
    code: 'doubleclick',
    name: 'Doubleclick',

    categories: [{
      code: 'rising-stars',
      name: 'RISING STARS',
      formats: [{
        code: 'billboard',
        name: 'Billboard'
      }, {
        code: 'filmstrip',
        name: 'Filmstrip',
        options: {
          initialDimensions: [
            {
              code: '300x600',
              width: 300,
              height: 600
            }, {
              code: '300x3000',
              width: 300,
              height: 3000
            }
          ]
        }
      }, {
        code: 'portrait',
        name: 'Portrait',
      }, {
        code: 'pushdown',
        name: 'Pushdown',
        options: {
          initialDimensions: [
            {
              code: '970x90',
              width: 970,
              height: 90
            }, {
              code: '970x66',
              width: 970,
              height: 66
            }
          ]
        }
      }, {
        code: 'sidekick',
        name: 'Sidekick',
        options: {
          initialDimensions: [
            {
              code: '300x250',
              width: 300,
              height: 250
            }, {
              code: '300x600',
              width: 300,
              height: 600
            }, {
              code: '970x250',
              width: 970,
              height: 250
            }
          ]
        }
      }, {
        code: 'slider',
        name: 'Slider',
        options: {
          initialDimensions: [
            {
              code: 'autox90',
              width: '100%',
              height: 90,
              activeAd: {
                position: 'center',
                width: 970,
                height: 90
              }
            }
          ]
        }
      }]
    }, {
      code: 'universal-ad-package-uap',
      name: 'UNIVERSAL AD PACKAGE (UAP)',
      formats: [{
        code: 'redium-rectangle',
        name: 'Medium Rectangle'
      }, {
        code: 'rectangle',
        name: 'rectangle'
      }, {
        code: 'wide-skyscrape',
        name: 'Wide Skyscrape'
      }, {
        code: 'leaderborard',
        name: 'Leaderborard'
      }]
    }, {
      code: 'other-ad-units',
      name: 'OTHER AD UNITS',
      formats: [{
        code: 'super-leaderboard-provisional-unit',
        name: 'Super Leaderboard - Provisional Unit',
        options: {
          initialDimensions: [
            {
              code: '970x90',
              width: 970,
              height: 90
            }, {
              code: '970x66',
              width: 970,
              height: 66
            }
          ]
        }
      }, {
        code: 'half-page',
        name: 'Half Page',
        options: {
          initialDimensions: ''
        }
      }, {
        code: 'button-2',
        name: 'Button 2',
        options: {
          initialDimensions: ''
        }
      }, {
        code: 'micro-bar',
        name: 'Micro Bar',
        options: {
          initialDimensions: ''
        }
      }]
    }, {
      code: 'rich-media-ad-guidance',
      name: 'RICH MEDIA AD GUIDANCE',
      formats: [{
        code: 'in-banner-video',
        name: 'In-Banner Video',
        options: {
          initialDimensions: [
            {
              code: '300x250',
              width: 300,
              height: 250
            }, {
              code: '180x150',
              width: 180,
              height: 150
            }, {
              code: '160x600',
              width: 160,
              height: 600
            }, {
              code: '728x90',
              width: 728,
              height: 90
            }, {
              code: '300x600',
              width: 300,
              height: 600
            }
          ]
        }
      }, {
        code: 'expandable-retractable',
        name: 'Expandable/Retractable',
        options: {
          dimensions: [
            {
              code: '300x250to600x250',
              initial: {
                width: 300,
                height: 250
              },
              final: {
                width: 600,
                height: 250
              }
            }, {
              code: '180x150to600x150',
              initial: {
                width: 180,
                height: 150
              },
              final: {
                width: 600,
                height: 150
              }
            }, {
              code: '160x600to600x600',
              initial: {
                width: 160,
                height: 600
              },
              final: {
                width: 600,
                height: 600
              }
            }, {
              code: '300x600to600x600',
              initial: {
                width: 300,
                height: 600
              },
              final: {
                width: 600,
                height: 600
              }
            }, {
              code: '728x90to728x315',
              initial: {
                width: 728,
                height: 90
              },
              final: {
                width: 728,
                height: 315
              }
            }
          ]
        }
      }, {
        code: 'pop-ups',
        name: 'Pop Ups',
        options: {
          initialDimensions: [
            {
              code: '300x250',
              width: 300,
              height: 250
            }, {
              code: '550x480',
              width: 550,
              height: 480
            }, {
              code: 'null',
              width: null,
              height: null
            }
          ]
        }
      }, {
        code: 'floating',
        name: 'Floating',
        options: {
          initialDimensions: ''
        }
      }, {
        code: 'between-the-page-intersitional',
        name: 'Between-the-Page (aka \'Intersitional\')',
        options: {
          initialDimensions: ''
        }
      }]
    }],

  }, {
    code: 'openx',
    name: 'OpenX'
  }]
};
