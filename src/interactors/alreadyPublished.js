const core = require('@actions/core');
const { TABLE_TITLE } = require('../constants');

module.exports = (pullRequest) => {
  const { body } = pullRequest || {};

  const regexp = new RegExp(`(${TABLE_TITLE})`);

  core.debug('typeof', typeof body);
  core.debug('test', regexp.test(body));
  core.debug(JSON.stringify(body));

  return regexp.test(body);
};
