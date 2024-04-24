import { resolve } from 'node:path';

import { sassPlugin } from 'esbuild-sass-plugin';

const {
    APP_DOMAIN,
    APP_URL,
    GOOGLE_ANALYTICS_ID,
    NODE_ENV,
    STATIC_URL,
    STORAGE_URL,
    YANDEX_METRIKA_ID
} = process.env;

export default {
    outdir: 'public',
    entryPoints: [
        { in: './src/class/app/index.js', out: 'class' },
        { in: './src/cms/app/index.js', out: 'cms' },
        { in: './src/crm/app/index.js', out: 'crm' },
        { in: './src/front/index.js', out: 'front' },
        // { in: './src/lk/app/index.js', out: 'lk' },
        { in: './src/lms/app/index.js', out: 'lms' }
    ],
    entryNames: '[dir]/[ext]/[name]',
    define: {
        'process.env': JSON.stringify({}),
        'env.APP_ENV': JSON.stringify(NODE_ENV || ''),
        'env.APP_URL': JSON.stringify(APP_URL || ''),
        'env.AUTH_URL': JSON.stringify(`//auth.${APP_DOMAIN}`),
        'env.CLASS_URL': JSON.stringify(`//class.${APP_DOMAIN}`),
        'env.CMS_URL': JSON.stringify(`//cms.${APP_DOMAIN}`),
        'env.CRM_URL': JSON.stringify(`//crm.${APP_DOMAIN}`),
        'env.GOOGLE_ANALYTICS_ID': JSON.stringify(GOOGLE_ANALYTICS_ID || ''),
        'env.LK_URL': JSON.stringify(`//lk.${APP_DOMAIN}`),
        'env.LMS_URL': JSON.stringify(`//lms.${APP_DOMAIN}`),
        'env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN || ''),
        'env.STATIC_URL': JSON.stringify(STATIC_URL || ''),
        'env.STORAGE_URL': JSON.stringify(STORAGE_URL || ''),
        'env.YANDEX_METRIKA_ID': JSON.stringify(YANDEX_METRIKA_ID || '')
    },
    jsx: 'automatic',
    loader: { '.js': 'jsx' },
    bundle: true,
    logLevel: 'info',
    plugins: [
        sassPlugin({
            type: 'local-css',
            filter: /\.module\.scss$/,
            loadPaths: [
                resolve('node_modules'),
                resolve('src')
            ]
        }),
        sassPlugin({
            type: 'css',
            filter: /\.scss$/,
            loadPaths: [
                resolve('node_modules'),
                resolve('src')
            ]
        })
    ]
};