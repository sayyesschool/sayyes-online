import { rm } from 'node:fs/promises';

import { context } from 'esbuild';

import { apps, islands } from './config.js';

await rm('./public', { recursive: true, force: true });

await (await context(apps)).watch();
await (await context(islands)).watch();