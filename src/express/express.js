'use strict';

const express = require(`express`);
const {articlesRoutes, personalRoutes, mainRoutes} = require(`./routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/my`, personalRoutes);
app.use((req, res) => res.send(`Not found`));

app.listen(DEFAULT_PORT);