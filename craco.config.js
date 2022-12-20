const path = require('path');
const CracoLessPlugin = require('craco-less');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
const BaseURL = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_ASSET;
console.log('env', BaseURL);
module.exports = {
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'https://ticket-dev.weiwenjia.com',
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //       pathRewrite: {
  //           "^/": ''
  //       }
  //     }
  //   },
  // },
  style: {},
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        /**
         * 解决less报错 错误信息 https://github.com/ant-design/ant-motion/issues/44
         */
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 修改输出为dist文件
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: `${BaseURL}/`,
      };
      return webpackConfig;
    },
    alias: {
      '@': pathResolve('./src/'),
      '@pages': pathResolve('./src/pages'), // 页面
      '@components': pathResolve('./src/components'), // 组件
      '@server': pathResolve('./src/server'), // api文件夹
      '@utils': pathResolve('./src/utils'), // 工具文件夹
      '@stroes': pathResolve('./src/stroes'), // 工具文件夹
    },
    rules: [
      {
        test: /\.js$/i,
        use: 'raw-loader',
      },
    ],
    plugins: {
      add: [
        new WebpackManifestPlugin({
          publicPath: BaseURL,
          generate: (seed, files) => {
            const obj = {};
            files.forEach(({
              name,
              path,
              isInitial,
            }) => {
              if (isInitial && /\.js$/.test(name) && /(main)/.test(name)) {
                obj.main = path;
              }
              if (isInitial && /\.css$/.test(name) && /(main)/.test(name)) {
                obj.mainCss = path;
              }
            });
            return { scripts: [obj.main, obj.mainCss] };
          },
        }),
      ],
    },
  },
};
