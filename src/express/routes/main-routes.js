'use strict';

const {Router} = require(`express`);
const {showRequestPath} = require(`../handlers`);
const mainRoutes = new Router();

mainRoutes.get(`/`, showRequestPath);
mainRoutes.get(`/register`, showRequestPath);
mainRoutes.get(`/login`, showRequestPath);
mainRoutes.get(`/search`, showRequestPath);
mainRoutes.get(`/categories`, showRequestPath);

module.exports = mainRoutes;
