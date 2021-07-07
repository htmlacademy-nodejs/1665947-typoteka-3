'use strict';

const {Router} = require(`express`);
const {showRequestPath} = require(`../handlers`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, showRequestPath);
articlesRouter.get(`/edit/:id`, showRequestPath);
articlesRouter.get(`/category/:id`, showRequestPath);
articlesRouter.get(`/:id`, showRequestPath);

module.exports = articlesRouter;
