import { rm } from 'node:fs/promises';

import { context } from 'esbuild';

import common from './common.js';

await rm('./public', { recursive: true, force: true });

await (await context({
    ...common,
    minify: false,
    sourcemap: true
})).watch();