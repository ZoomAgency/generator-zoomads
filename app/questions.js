'use strict';

var platformsData = require('./data').platforms,
    _ = require('lodash');

module.exports = [{
  type: 'rawlist',
  name: 'platform',
  message: '¿Con qué soporte trabajas?',
  choices: function() {
    return platformsChoices();
  },
  default: 0
}, {
  type: 'rawlist',
  name: 'category',
  message: '¿A qué categoría pertenece el formato que deseas crear?',
  choices: function(response) {
    return categoriesChoices(response.platform);
  },
  default: 0
}, {
  when: function(response) {
    return response.category === 'rising-stars';
  },
  type: 'rawlist',
  name: 'format',
  message: '¿Qué formato deseas crear?',
  choices: function(response) {
    return formatsChoices(response.platform, response.category);
  },
  default: 0
}, {
  when: function(response) {
    return response.format === 'filmstrip';
  },
  type: 'rawlist',
  name: 'dimensions',
  message: '¿Cuales son las dimensiones del banner? (WxH en pixeles)',
  choices: function(response) {
    return dimensionsChoices(response.platform, response.category, response.format);
  },
  default: 1
}];

function platformsChoices() {
  return generateChoicesType('name-code', platformsData);
}

function categoriesChoices(platform) {
  var categories = null,
      categoriesData;

  categoriesData = getCategoriesOptions(platform);

  categories = generateChoicesType('name-code', categoriesData);

  return categories;
}

function formatsChoices(platform, category) {
  var formats = null,
      formatsData;

  formatsData = getFormatsOptions(platform, category);

  formats = generateChoicesType('name-code', formatsData);

  return formats;
}

function dimensionsChoices(platform, category, format) {
  var dimensions = null,
      dimensionsData;

  dimensionsData = getDimensionsOptions(platform, category, format);

  dimensions = generateChoicesType('initialDimensions', dimensionsData);

  return dimensions;
}

function getCategoriesOptions(platform) {
  var categoryData = null,
      platformData;

  platformData = getPlatformData(platform);
  categoryData = platformData.categories;

  return categoryData;
}

function getFormatsOptions(platform, category) {
  var formatsData = null,
      categoriesData,
      categoryData;

  categoriesData = getCategoriesOptions(platform);
  categoryData = _.find(categoriesData, { code: category });

  formatsData = categoryData.formats;

  return formatsData;
}

function getDimensionsOptions(platform, category, format) {
  var dimensionsData,
      allFormatsData,
      formatData;

  allFormatsData = getFormatsOptions(platform, category);
  formatData = _.find(allFormatsData, { code: format });

  dimensionsData = getDimensionsOfFormat(formatData);

  return dimensionsData;
}

function getPlatformData(platformCode) {
  return _.find(platformsData, { code: platformCode });
}

function getDimensionsOfFormat(formatData) {
  var dimensionsData = null,
      optionsData;

  if (formatData.options) {
    optionsData = formatData.options;

    if (optionsData.initialDimensions) {
      dimensionsData = optionsData.initialDimensions;
    }
  }

  return dimensionsData;
}

function generateChoicesType(type, data) {
  var choices = [];

  data.forEach(function(item, index) {
    var choice;

    choice = generateChoiceOption(type, item, index);

    if (choice)
      choices.push(choice);
  });

  return choices;
}

function generateChoiceOption(type, item, index) {
  var choseObject;

  switch (type) {
    case 'name-code':
      choseObject = { key: index, name: item.name, value: item.code };
      break;
    case 'initialDimensions':
      choseObject = { key: index, name: item.code, value: item };
      break;
    default: {
      choseObject = null;
    }
  }

  return choseObject;
}
