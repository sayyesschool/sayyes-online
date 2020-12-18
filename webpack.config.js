const path = require('path');
const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { YANDEX_METRIKA_ID, GOOGLE_ANALYTICS_ID } = require('./config');

module.exports = [
    env => config('admin', env),
    env => config('class', env),
    env => config('client', env),
    env => config('teacher', env)
];

function config(name, env) {
    const APP_URL = env === 'development' ? 'http://localhost' : 'https://online.sayes.ru';
    const STATIC_URL = 'https://static.sayes.ru';

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
                            presets: ['@babel/preset-env', '@babel/preset-react']
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
                                    plugins: ['postcss-preset-env']
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                webpackImporter: false,
                                sassOptions: {
                                    includePaths: [
                                        path.resolve('node_modules'),
                                        path.resolve('shared')
                                    ]
                                }
                            }
                        }
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
            })
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
                new OptimizeCSSAssetsPlugin({})
            ]
        },

        resolve: {
            extensions: ['.js', '.json', '.jsx', '*'],

            // modules: [
            //     path.resolve(__dirname, '..', 'node_modules'),
            //     path.resolve(__dirname, '..', 'shared', 'client')
            // ],

            alias: {
                'app': path.resolve(__dirname, name, 'app'),
                'shared': path.resolve(__dirname, 'shared', 'client')
            },

            fallback: {
                util: require.resolve('util/')
            }
        }
    };
}