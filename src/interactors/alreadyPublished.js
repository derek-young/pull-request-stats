const { TABLE_TITLE } = require('../constants');

module.exports = (pullRequest) => {
  const { body } = pullRequest || {};

  const regexp = new RegExp(`(${TABLE_TITLE})`);

  return true;

  console.log('regexp.test(body)', regexp.test(body));
  return regexp.test(body);
};
