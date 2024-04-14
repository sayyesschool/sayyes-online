const { register } = require('node:module');
const { pathToFileURL } = require('node:url');

const path = pathToFileURL(__filename);

register('commonjs-extension-resolution-loader', path);
register('./import-map.mjs', path);