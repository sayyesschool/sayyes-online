import { build } from 'esbuild';

import { apps, islands } from './config.js';

await build(apps);
await build(islands);