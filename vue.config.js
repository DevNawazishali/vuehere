const path = require('path');

const resolve = dir => path.resolve(__dirname, dir);

const rootPath = '/';

const isProduction = process.env.NODE_ENV === 'production';

const {
  npm_package_name: name,
} = process.env;

module.exports = {
  productionSourceMap: !isProduction,
  publicPath: process.env.NODE_ENV === 'production' ? './' : rootPath,
  outputDir: `${name}` || 'dist',
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8183,
    proxy: {
      '/': {
        target: 'https://www.bomberquest.co',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // overlay: {
    //     errors: true,
    //     warnings: true
    // },
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/css/colors.less'),
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'));
    config.module
      .rule('yml')
      .test(/\.ya?ml$/)
      .use('json')
      .loader('json-loader')
      .end()
      .use('yaml')
      .loader('yaml-loader')
      .end();
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
      .use('yaml')
      .loader('yaml-loader')
      .end();

    config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
};
