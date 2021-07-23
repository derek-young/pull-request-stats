const { TABLE_TITLE } = require('../constants');

module.exports = (pullRequest) => {
  const { body } = pullRequest || {};

  const regexp = new RegExp(`(${TABLE_TITLE})`);

  console.log('regexp.test(body)', regexp.test(body));
  return regexp.test(body);
};
