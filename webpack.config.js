const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const CssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer')();

const { YANDEX_METRIKA_ID, GOOGLE_ANALYTICS_ID } = require('./core/config');

module.exports = [
    env => config('admin', env),
    env => config('student', env),
    env => config('teacher', env)
];

function config(name, env) {
    const APP_URL = env === 'development' ? 'http://localhost' : 'https://online.sayes.ru';

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
                                plugins: [autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass,
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
                'APP_ENV': JSON.stringify(env),
                'APP_URL': JSON.stringify(APP_URL),
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

            // splitChunks: {
            //     chunks: 'all',
            //     name: 'shared'
            // },

            // minimizer: [
            //     new UglifyJsPlugin({
            //         uglifyOptions: {
            //             output: {
            //                 comments: false
            //             }
            //         }
            //     }),
            //     new OptimizeCSSAssetsPlugin({})
            // ]
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
            }
        }
    };
}