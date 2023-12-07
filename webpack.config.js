const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const SentryWebpackPlugin = require('@sentry/webpack-plugin');

dotenv.config();

const {
    STATIC_URL,
    STORAGE_URL,
    YANDEX_METRIKA_ID,
    GOOGLE_ANALYTICS_ID,
    SENTRY_AUTH_TOKEN
} = process.env;

module.exports = [
    env => config({ name: 'class', env }),
    env => config({ name: 'club', env }),
    env => config({ name: 'cms', env }),
    env => config({ name: 'crm', env }),
    env => config({ name: 'front', env, override: { entry: './src/front/index.js' } }),
    env => config({ name: 'lms', env })
];

function config({ name, env, rules = [], plugins = [], override = {} }) {
    const APP_DOMAIN = env.development ? 'sayyes.local' : 'sayyes.school';
    const APP_URL = `https://${APP_DOMAIN}`;

    return {
        name,

        entry: `./src/${name}/app/index.js`,

        output: {
            path: path.resolve(__dirname, 'public'),
            filename: `js/${name}.[name].js`
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', {
                                    'runtime': 'automatic'
                                }]
                            ],
                            plugins: [
                                '@babel/plugin-proposal-export-default-from'
                            ]
                        }
                    }
                },
                {
                    test: /\.(s*)css$/,
                    use: [
                        CssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                // modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [
                                        path.resolve('node_modules'),
                                        path.resolve('src')
                                    ]
                                }
                            }
                        },
                        ...rules
                    ]
                }
            ]
        },

        devtool: env.development ? 'eval-source-map' : 'source-map',

        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({}),
                'env.APP_ENV': JSON.stringify(env),
                'env.APP_URL': JSON.stringify(APP_URL),
                'env.AUTH_URL': JSON.stringify(`//auth.${APP_DOMAIN}`),
                'env.CLASS_URL': JSON.stringify(`//class.${APP_DOMAIN}`),
                'env.CMS_URL': JSON.stringify(`//cms.${APP_DOMAIN}`),
                'env.CRM_URL': JSON.stringify(`//crm.${APP_DOMAIN}`),
                'env.GOOGLE_ANALYTICS_ID': JSON.stringify(GOOGLE_ANALYTICS_ID),
                'env.LK_URL': JSON.stringify(`//lk.${APP_DOMAIN}`),
                'env.LMS_URL': JSON.stringify(`//lms.${APP_DOMAIN}`),
                'env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN || ''),
                'env.STATIC_URL': JSON.stringify(STATIC_URL),
                'env.STORAGE_URL': JSON.stringify(STORAGE_URL),
                'env.YANDEX_METRIKA_ID': JSON.stringify(YANDEX_METRIKA_ID),
            }),
            new CssExtractPlugin({
                filename: `css/${name}.[name].css`
            }),
            // env.production ? new SentryWebpackPlugin({
            //     org: 'say-yes',
            //     project: 'app',
            //     include: './public/js',
            //     authToken: SENTRY_AUTH_TOKEN
            // }) : undefined,
            ...plugins
        ].filter(Boolean),

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },

            minimize: true,

            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false
                }),
                new CssMinimizerPlugin()
            ]
        },

        resolve: {
            extensions: ['.js', '.json', '.jsx', '*'],

            alias: {
                '@': path.resolve(__dirname, 'src'),
                'app': path.resolve(__dirname, 'src', name, 'app'),
                'core': path.resolve(__dirname, 'src', 'core'),
                'lms': path.resolve(__dirname, 'src', 'lms', 'app'),
                'shared': path.resolve(__dirname, 'src', 'shared')
            },

            fallback: {
                util: require.resolve('util/')
            }
        },
        ...override
    };
}