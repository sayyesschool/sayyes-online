import { build } from 'esbuild';

import common from './common.js';

await build({
    ...common,
    minify: true,
    sourcemap: false
});