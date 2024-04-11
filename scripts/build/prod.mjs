import { build } from 'esbuild';

import common from './common.mjs';

await build({
    ...common,
    minify: true,
    sourcemap: false
});