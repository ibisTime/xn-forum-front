var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
    context: path.join(__dirname),
    devtool: debug
        ? "inline-sourcemap"
        : null,
    entry: {
        root: [
            'babel-polyfill', "./src/js/index.js"
        ],
        vendor: ['react']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react', 'latest', 'es2016', 'es2015', "stage-0"
                    ],
                    plugins: [
                        'react-html-attrs',
                        [
                            "import",
                            [
                                // {
                                //     "libraryName": "antd",
                                //     "style": "css"
                                // },
                                 {
                                    "libraryName": "antd-mobile",
                                    // "style": true
                                }
                            ]
                        ]
                    ] //添加组件的插件配置
                }
            },
            //   // 组件样式，需要私有化，单独配置
            //   {
            //     test: /\.scss$/,
            //     include: path.resolve(__dirname, './src/js'),
            //     loaders: [
            //       'style-loader',
            //       'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
            //       'postcss-loader?parser=postcss-scss'
            //     ]
            //   },

            // 公有样式，不需要私有化，单独配置
            //下面是使用 ant-design 的配置文件
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {//woff|woff2|eot|ttf|svg
                test: /\.(png|jpg|gif)$/,
                // test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.woff|eot|ttf$/,
                loader: require.resolve('file-loader') + '?name=[path][name].[ext]'
            },
            {
               test: /\.(svg)$/i,
               loader: 'svg-sprite',
               include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            }
        ]
    },
    // output: {
    //   path: __dirname,
    //   filename: "./src/bundle.js"
    // },
    output: {
        filename: '[name].js', //注意这里，用[name]可以自动生成路由名称对应的js文件
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        chunkFilename: '[name].js' //注意这里，用[name]可以自动生成路由名称对应的js文件
    },
    plugins: debug
        ? []
        : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
            new webpack.optimize.CommonsChunkPlugin({names: ['vendor'], filename: 'vendor.js'})
        ]

};
