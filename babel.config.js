module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      corejs: 3,
    }],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    ['@babel/plugin-proposal-optional-chaining'], // 可选链式语法
    ['@babel/plugin-proposal-nullish-coalescing-operator'], // 解析 ??
  ],
};
