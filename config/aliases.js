const path = require('path');

const rootPath = '..';
const commonServicePath = `${rootPath}/src/services`;
const commonComponentsPath = `${rootPath}/src/components`;


function setPath(p) {
    "use strict";
    return path.resolve(__dirname, p);
}

module.exports = {
    '/components': setPath(commonComponentsPath),
    '/scenes': setPath(`${rootPath}/src/scenes`),
    '/services': setPath(commonServicePath),
    '/modules': setPath(`${rootPath}/src/modules`),

    'core.styles': setPath(`${rootPath}/src/styles`),
    'store/middleware/api': setPath(`${rootPath}/src/store/middleware/api.js`)
};
