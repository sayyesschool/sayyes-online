import { readFile, rm } from 'node:fs/promises';

import { context } from 'esbuild';

import common from './common.js';

await rm('./public', { recursive: true, force: true });

await (await context({
    ...common,
    minify: false,
    sourcemap: true,
    plugins: [
        ...common.plugins,
        {
            name: 'excludeVendorFromSourceMap',
            setup(build) {
                build.onLoad({ filter: /node_modules/ }, async args => {
                    const contents = await readFile(args.path, 'utf8');

                    return {
                        loader: 'default',
                        contents: args.path.endsWith('.json') ?
                            contents :
                            contents + '\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ=='
                    };
                });
            }
        }
    ]
})).watch();