'use strict';

var platformsData = require('./data').platforms,
    _find = require('lodash/find');

var self = {};

module.exports = [{
  type: 'list',
  name: 'platform',
  message: '¿Con qué soporte trabajas?',
  choices: function() {
    return platformsChoices();
  },
  default: 0
}, {
  type: 'list',
  name: 'category',
  message: '¿A qué categoría pertenece el formato que deseas crear?',
  choices: function(response) {
    return categoriesChoices(response.platform);
  },
  default: 0
}, {
  when: function(response) {
    self.formatsChoices = formatsChoices(response.platform, response.category);

    return hasChoices(self.formatsChoices);
  },
  type: 'list',
  name: 'format',
  message: '¿Qué formato deseas crear?',
  choices: function(response) {
    return self.formatsChoices;
  },
  default: 0
}, {
  when: function(response) {
    self.dimensionsChoices = dimensionsChoices(response.platform, response.category, response.format);

    return hasChoices(self.dimensionsChoices);
  },
  type: 'list',
  name: 'dimensions',
  message: '¿Cuales son las dimensiones del banner? (WxH en pixeles)',
  choices: function(response) {
    return self.dimensionsChoices;
  },
  default: 0
}];

function platformsChoices() {
  return generateChoicesType('name-code', platformsData);
}

function hasChoices(choicesArray) {
  var hasChoicesResult = false;

  if (choicesArray.length > 0)
    hasChoicesResult = true;

  return hasChoicesResult;
}

function categoriesChoices(platform) {
  var categories = [],
      categoriesData;

  categoriesData = getCategoriesOptions(platform);

  categories = generateChoicesType('name-code', categoriesData);

  return categories;
}

function formatsChoices(platform, category) {
  var formats = [],
      formatsData;

  formatsData = getFormatsOptions(platform, category);

  formats = generateChoicesType('name-code', formatsData);

  return formats;
}

function dimensionsChoices(platform, category, format) {
  var dimensions = [],
      dimensionsData;

  dimensionsData = getDimensionsOptions(platform, category, format);

  dimensions = generateChoicesType('initialDimensions', dimensionsData);

  return dimensions;
}

function getCategoriesOptions(platform) {
  var categoryData = [],
      platformData;

  platformData = getPlatformData(platform);
  categoryData = platformData.categories;

  return categoryData;
}

function getFormatsOptions(platform, category) {
  var formatsData = [],
      categoriesData,
      categoryData;

  categoriesData = getCategoriesOptions(platform);
  categoryData = _find(categoriesData, { code: category });

  formatsData = categoryData.formats;

  return formatsData;
}

function getDimensionsOptions(platform, category, format) {
  var dimensionsData,
      allFormatsData,
      formatData;

  allFormatsData = getFormatsOptions(platform, category);
  formatData = _find(allFormatsData, { code: format });

  dimensionsData = getDimensionsOfFormat(formatData);

  return dimensionsData;
}

function getPlatformData(platformCode) {
  return _find(platformsData, { code: platformCode });
}

function getDimensionsOfFormat(formatData) {
  var dimensionsData = [],
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
