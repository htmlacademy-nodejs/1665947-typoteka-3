'use strict';

const {Router} = require(`express`);
const {showRequestPath} = require(`../handlers`);
const personalRoutes = new Router();

personalRoutes.get(`/`, showRequestPath);
personalRoutes.get(`/comments`, showRequestPath);

module.exports = personalRoutes;
