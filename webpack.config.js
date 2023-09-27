const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

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
    env => config({ name: 'cms', env }),
    env => config({ name: 'crm', env }),
    env => config({ name: 'front', env, override: { entry: './src/front/index.js' } }),
    env => config({ name: 'lms', env })
];

function config({ name, env, rules = [], plugins = [], override = {} }) {
    const APP_URL = env.development ? 'http://localhost' : 'https://sayyesonline.ru';

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
                'APP_ENV': JSON.stringify(env),
                'APP_URL': JSON.stringify(APP_URL),
                'SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN || ''),
                'STATIC_URL': JSON.stringify(STATIC_URL),
                'STORAGE_URL': JSON.stringify(STORAGE_URL),
                'YANDEX_METRIKA_ID': JSON.stringify(YANDEX_METRIKA_ID),
                'GOOGLE_ANALYTICS_ID': JSON.stringify(GOOGLE_ANALYTICS_ID)
            }),
            new CssExtractPlugin({
                filename: `css/${name}.[name].css`
            }),
            env.production ? new SentryWebpackPlugin({
                org: 'say-yes',
                project: 'app',
                include: './public/js',
                authToken: SENTRY_AUTH_TOKEN
            }) : undefined,
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
                'lms': path.resolve(__dirname, 'src', 'lms'),
                'shared/data': path.resolve(__dirname, 'src', 'shared', 'data'),
                'shared/libs': path.resolve(__dirname, 'src', 'shared', 'libs'),
                'shared/utils': path.resolve(__dirname, 'src', 'shared', 'utils'),
                'shared/styles': path.resolve(__dirname, 'src', 'shared', 'styles'),
                'shared': path.resolve(__dirname, 'src', 'shared', 'client'),
                'lms': path.resolve(__dirname, 'src', 'lms', 'app')
            },

            fallback: {
                util: require.resolve('util/')
            }
        },
        ...override
    };
}