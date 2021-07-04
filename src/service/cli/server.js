'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HTTP_CODE} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const NOT_FOUND_MESSAGE_TEXT = `Not found`;
const PAGE_TITLE = `Publications`;

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        sendResponse(res, HTTP_CODE.OK, getOffersPageBody(mocks));
      } catch (err) {
        sendNotFoundResult(res);
      }
      break;
    default:
      sendNotFoundResult(res);
      break;
  }
};

const sendNotFoundResult = (response) => sendResponse(response, HTTP_CODE.NOT_FOUND, NOT_FOUND_MESSAGE_TEXT);

const sendResponse = (response, statusCode, message) => {
  response.statusCode = statusCode;
  response.writeHead(statusCode, {'Content-Type': `text/html; charset=UTF-8`});
  response.end(renderTemplate(message));
};

const getOffersPageBody = (offers) => {
  return `<ul>${offers.map((post) => `<li>${post.title}</li>`).join(``)}</ul>`;
};

const renderTemplate = (body) => `<!Doctype html>
<html lang="ru">
<head>
  <title>${PAGE_TITLE}</title>
</head>
<body>${body}</body>
</html>`.trim();

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    http.createServer(onClientConnect)
        .listen(port)
        .on(`listening`, (err) => {
          if (err) {
            return console.error(chalk.red(`Attempt to create server failed`), err);
          }
          return console.info(chalk.green(`Waiting connection on port ${port}`));
        });
  }
};
