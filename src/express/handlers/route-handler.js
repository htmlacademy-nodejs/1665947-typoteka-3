'use strict';

const getFullRoute = (request) => {
  const {baseUrl, route: {path: routePath}} = request;
  return routePath === `/`
    ? (baseUrl === `` ? `/` : baseUrl)
    : `${baseUrl}${routePath}`;
};

module.exports = {
  showRequestPath: (req, res) => {
    return res.send(`Requested route: '${getFullRoute(req)}'`);
  },
};
