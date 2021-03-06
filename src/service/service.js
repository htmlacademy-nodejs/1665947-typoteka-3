'use strict';

const cli = require(`./cli`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  EXIT_CODES
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !cli[userCommand]) {
  cli[DEFAULT_COMMAND].run();
  process.exit(EXIT_CODES.success);
}

cli[userCommand].run(userArguments.slice(1));
