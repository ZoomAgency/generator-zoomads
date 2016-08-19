'use strict';

module.exports = [{
  type: 'rawlist',
  name: 'platform',
  message: '¿Con qué soporte trabajas?',
  choices: [
    { key: '1', name: 'Doubleclick', value: 'doubleclick' },
    { key: '2', name: 'OpenX', value: 'openx' }
  ],
  default: 0
}, {
  type: 'rawlist',
  name: 'formatCategory',
  message: '¿A qué categoría pertenece el formato que deseas crear?',
  choices: [
    { key: '1', name: 'RISING STARS', value: 'rising-stars' },
    { key: '2', name: 'UNIVERSAL AD PACKAGE (UAP)', value: 'uap' },
    { key: '3', name: 'OTHER AD UNITS', value: 'other-ad-units' },
    { key: '4', name: 'RICH MEDIA AD GUIDANCE', value: 'rich-media-ad-guidance' }
  ],
  default: 0
}, {
  when: function(response) {
    return response.formatCategory === 'rising-stars';
  },
  type: 'rawlist',
  name: 'format',
  message: '¿Qué formato deseas crear?',
  choices: [
    { key: '1', name: 'Billboard', value: 'billboard' },
    { key: '2', name: 'Filmstrip', value: 'filmstrip' },
    { key: '3', name: 'etc', value: 'etc' }
  ],
  default: 0
}, {
  when: function(response) {
    return response.format === 'filmstrip';
  },
  type: 'rawlist',
  name: 'dimensions',
  message: '¿Cuales son las dimensiones del banner? (WxH en pixeles)',
  choices: [
    { key: '1', name: '1. 300x600', value: '300x600' },
    { key: '2', name: '2. 300x3000', value: '300x3000' },
    { key: '3', name: '3. Personalizado', value: 'etc' }
  ],
  default: 1
}];
