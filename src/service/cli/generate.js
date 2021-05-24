'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const add = require(`date-fns/add`);
const differenceInCalendarDays = require(`date-fns/differenceInCalendarDays`);

const {getRandomInt, shuffle} = require(`../../utils/random-utils`);
const {EXIT_CODES} = require(`../../constants`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const MAX_ANOUNCE_SENTENCES_AMOUNT = 5;
const MAX_DATE_OFFSET_IN_MONTHS = 3;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).map((x) => x.trim());
  } catch (err) {
    showError(err);
    return [];
  }
};

const getMaxDateOffsetInDays = () => {
  const date = new Date();
  return differenceInCalendarDays(date, add(date, {months: -MAX_DATE_OFFSET_IN_MONTHS}));
};

const generateDate = (dateTo, maxOffsetInDays) => {
  const randomOffset = getRandomInt(0, maxOffsetInDays);
  return add(dateTo, {days: -randomOffset});
};

const getRandomItem = (items) => {
  return items[getRandomInt(0, items.length - 1)];
};

const generateText = (sentences, maxSentencesAmount) => {
  return shuffle(sentences).slice(0, maxSentencesAmount).join(` `);
};

const generateAnounceText = (sentences) => {
  return generateText(sentences, MAX_ANOUNCE_SENTENCES_AMOUNT);
};

const generateFullText = (sentences) => {
  return generateText(sentences, sentences.length - 1);
};

const generatePublications = (count, {titles, categories, sentences}) => {
  const maxOffsetInDays = getMaxDateOffsetInDays();
  const now = new Date();

  return [...Array(count)].map(() => ({
    title: getRandomItem(titles),
    createdDate: generateDate(now, maxOffsetInDays),
    announce: generateAnounceText(sentences),
    fullText: generateFullText(sentences),
    category: getRandomItem(categories),
  }));
};

const readTemplates = async () => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);

  return {sentences, titles, categories};
};

const showError = (errorText) => console.info(chalk.red(errorText));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const publicationsAmount = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (publicationsAmount > MAX_COUNT) {
      showError(`Не больше ${MAX_COUNT} элементов.`);
      process.exit(EXIT_CODES.error);
    }

    const templates = await readTemplates();
    const publications = generatePublications(publicationsAmount, templates);
    const content = JSON.stringify(publications);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Файл сгенерирован.`));
      process.exit(EXIT_CODES.success);
    } catch (err) {
      showError(`Возникла ошибка при формировании файла...`);
      process.exit(EXIT_CODES.error);
    }
  }
};
