const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

dotenv.config();

const { STATIC_URL, STORAGE_URL, YANDEX_METRIKA_ID, GOOGLE_ANALYTICS_ID } = process.env;

module.exports = [
    env => config({ name: 'class', env }),
    env => config({ name: 'cms', env }),
    env => config({ name: 'crm', env }),
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
                'STATIC_URL': JSON.stringify(STATIC_URL),
                'STORAGE_URL': JSON.stringify(STORAGE_URL),
                'YANDEX_METRIKA_ID': JSON.stringify(YANDEX_METRIKA_ID),
                'GOOGLE_ANALYTICS_ID': JSON.stringify(GOOGLE_ANALYTICS_ID)
            }),
            new CssExtractPlugin({
                filename: `css/${name}.[name].css`
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
                '@': path.resolve(__dirname, 'src'),
                'app': path.resolve(__dirname, 'src', name, 'app'),
                'core': path.resolve(__dirname, 'src', 'core'),
                'lms': path.resolve(__dirname, 'src', 'lms'),
                'shared/data': path.resolve(__dirname, 'src', 'shared', 'data'),
                'shared/libs': path.resolve(__dirname, 'src', 'shared', 'libs'),
                'shared/utils': path.resolve(__dirname, 'src', 'shared', 'utils'),
                'shared': path.resolve(__dirname, 'src', 'shared', 'client')
            },

            fallback: {
                util: require.resolve('util/')
            }
        },
        ...override
    };
}