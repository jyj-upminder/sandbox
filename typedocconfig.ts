module.exports = {
  src: [
    './src',
  ],
  mode: 'file',
  exclude: ["./src/assets"],
  includeDeclarations: true,
  tsconfig: 'tsconfig.json',
  out: './docs',
  // out: './docs/v1',
  excludePrivate: false,
  excludeProtected: false,
  excludeExternals: true,
  readme: 'README.md',
  name: 'Core People Z',
  ignoreCompilerErrors: true,
  plugin: 'none',
  listInvalidSymbolLinks: true,
};