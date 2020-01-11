export default {
  compileEnhancements: false,
  extensions: ['ts'],
  files: ['src/**/*.(spec|test).ts'],
  require: ['esm', 'ts-node/register', 'tsconfig-paths/register'],
};
