const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { STATIC_URL, YANDEX_METRIKA_ID, GOOGLE_ANALYTICS_ID } = require('./config');

module.exports = [
    env => config({ name: 'admin', env }),
    env => config({ name: 'class', env }),
    env => config({ name: 'client', env }),
    env => config({
        name: 'main',
        env,
        override: {
            entry: [
                './main/shared/styles/index.scss',
                './main/shared/scripts.js'
            ],
            output: {
                path: path.resolve(__dirname, 'public'),
                filename: 'build/js/[name].js'
            },
            plugins: [
                new CssExtractPlugin({
                    filename: 'build/css/[name].css'
                })
            ],
            optimization: {
                minimize: true
            }
        }
    }),
    env => config({ name: 'teacher', env })
];

function config({ name, env, rules = [], plugins = [], override = {} }) {
    const APP_URL = env === 'development' ? 'http://localhost' : 'https://sayyesonline.ru';

    return {
        name,

        entry: `./${name}/app/index.js`,

        output: {
            path: path.resolve(__dirname, 'public', 'build'),
            filename: `${name}.[name].js`
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
                                url: false
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
                                        path.resolve('shared')
                                    ]
                                }
                            }
                        },
                        ...rules
                    ]
                }
            ]
        },

        devtool: (env === 'development') ? 'eval-source-map' : undefined,

        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({}),
                'APP_ENV': JSON.stringify(env),
                'APP_URL': JSON.stringify(APP_URL),
                'STATIC_URL': JSON.stringify(STATIC_URL),
                'YANDEX_METRIKA_ID': JSON.stringify(YANDEX_METRIKA_ID),
                'GOOGLE_ANALYTICS_ID': JSON.stringify(GOOGLE_ANALYTICS_ID)
            }),
            new CssExtractPlugin({
                filename: `${name}.[name].css`
            }),
            ...plugins
        ],

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
                'app': path.resolve(__dirname, name, 'app'),
                'core': path.resolve(__dirname, 'core'),
                'shared/utils': path.resolve(__dirname, 'shared', 'utils'),
                'shared/data': path.resolve(__dirname, 'shared', 'data'),
                'shared': path.resolve(__dirname, 'shared', 'client')
            },

            fallback: {
                util: require.resolve('util/')
            }
        },
        ...override
    };
}