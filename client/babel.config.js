module.exports = function (api) {
  const useESModules = true;

  api && api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs'
        }
      ],
      [
        '@vue/babel-preset-jsx',
        {
          functional: false
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules
        }
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-object-assign'
    ]
  }
}
