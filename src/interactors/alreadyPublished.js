const { TABLE_TITLE } = require('../constants');

module.exports = (pullRequest) => {
  const { body } = pullRequest || {};

  const regexp = new RegExp(`(${TABLE_TITLE})`);

  return regexp.test(body);
};
