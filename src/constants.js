'use strict';

module.exports = {
  DEFAULT_COMMAND: `--version`,
  USER_ARGV_INDEX: 2
};

module.exports.EXIT_CODES = {
  success: 0,
  error: 1
};

module.exports.HTTP_CODE = {
  OK: 200,
  NOT_FOUND: 404,
};
