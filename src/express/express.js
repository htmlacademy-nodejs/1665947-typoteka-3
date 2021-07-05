'use strict';

const express = require(`express`);
const {articlesRoutes, personalRoutes} = require(`./routes`);
const {showRequestPath} = require(`./handlers`);

const DEFAULT_PORT = 8080;

const app = express();

app.get(`/`, showRequestPath);
app.get(`/register`, showRequestPath);
app.get(`/login`, showRequestPath);
app.get(`/search`, showRequestPath);
app.get(`/categories`, showRequestPath);

app.use(`/articles`, articlesRoutes);
app.use(`/my`, personalRoutes);
app.use((req, res) => res.send(`Not found`));
app.listen(DEFAULT_PORT);