'use strict';

exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.shuffle = (someArray) => [...someArray].sort(() => Math.random() - 0.5);
