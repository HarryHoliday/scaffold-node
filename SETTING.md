# setting

```bash
npm init -y
npm install --save-dev eslint typescript
npx tsc --init
npx eslint --init
```

```text
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? Yes
? Where does your code run? Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Standard: https://github.com/standard/standard
? What format do you want your config file to be in? JavaScript
Checking peerDependencies of eslint-config-standard@latest
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint@>=6.2.2 eslint-plugin-import@>=2.18.0 eslint-plugin-node@>=9.1.0 eslint-plugin-promise@>=4.2.1 eslint-plugin-standard@>=4.0.0 @typescript-eslint/parser@latest
? Would you like to install them now with npm? Yes
Installing @typescript-eslint/eslint-plugin@latest, eslint-config-standard@latest, eslint@>=6.2.2, eslint-plugin-import@>=2.18.0, eslint-plugin-node@>=9.1.0, eslint-plugin-promise@>=4.2.1, eslint-plugin-standard@>=4.0.0, @typescript-eslint/parser@latest
npm WARN rootenergy-micro-mongodb@1.0.0 No description
npm WARN rootenergy-micro-mongodb@1.0.0 No repository field.

+ eslint-plugin-import@2.19.1
+ eslint-plugin-standard@4.0.1
+ eslint-plugin-promise@4.2.1
+ eslint-config-standard@14.1.0
+ eslint-plugin-node@11.0.0
+ eslint@6.8.0
+ @typescript-eslint/eslint-plugin@2.15.0
+ @typescript-eslint/parser@2.15.0
added 75 packages from 49 contributors, updated 2 packages and audited 456 packages in 10.575s

16 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Successfully created .eslintrc.js file in /Users/harryholiday/dev/rootenergy/project/1.milestone/rootenergy-micro-mongodb
```

```bash
npm install --save-dev @types/node
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier

mkdir -p ./src && touch ./src/index.ts
vim index.ts
```

```js
import path from 'path';

console.log(path.resolve(__dirname, './'));
```

```bash
npm install --save-dev webpack webpack-cli
npm install --save-dev eslint-loader
npm install --save-dev @babel/core babel-loader @babel/preset-typescript
npm install --save-dev dotenv dotenv-expand nodemon nodemon-webpack-plugin webpack-node-externals
npm install --save-dev ts-config-webpack-plugin
npm install --save-dev husky lint-staged
npm install --save-dev ava eslint-plugin-ava
```

### .eslintrc.js

```js
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:ava/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
      },
    },
  },
  rules: {
    'import/prefer-default-export': OFF,
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    // 'no-console': OFF,
    'import/no-unresolved': OFF,
  },
};
```

### eslintignore

```text
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage
/test
# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

```

### tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "~src/*": ["*"],
      "~lib/*": ["lib/*"]
    },
    "target": "es5",
    "lib": ["es5", "es6", "dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "files": ["global.d.ts"],
  "exclude": ["node_modules"]
}
```

### .prettierrc.js

```js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
};
```

### ava.config.js

```js
export default {
  compileEnhancements: false,
  extensions: ['ts'],
  files: ['src/**/*.(spec|test).ts'],
  require: ['esm', 'ts-node/register', 'tsconfig-paths/register'],
};
```

### webpack.config.js

```js
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode || 'development';
  // eslint-disable-next-line global-require
  const getEnvironment = require('./config/env');
  const isProd = argv.mode === 'production';
  const config = {
    mode: argv.mode,
    target: 'node',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      path: path.resolve(__dirname, './build'),
      publicPath: '/',
      filename: 'server.js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '~src': path.resolve(__dirname, './src'),
        '~lib': path.resolve(__dirname, './src/lib'),
      },
    },
    externals: [nodeExternals()],
    module: {
      strictExportPresence: true,
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          loader: require.resolve('eslint-loader'),
        },
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },
        },
      ],
    },
    plugins: [new webpack.DefinePlugin(getEnvironment()), new TsConfigWebpackPlugin()],
    stats: 'errors-warnings',
  };
  if (!isProd) {
    config.plugins.push(new NodemonPlugin());
  }
  return config;
};
```

### package.json

```json
...
  "scripts": {
    "dev": "webpack --mode development --config webpack.config.js --watch",
    "build": "webpack --mode production --config webpack.config.js",
    "test": "ava",
    "watch:test": "ava --watch"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx,json,css,scss}": [
      "prettier --write",
      "git add"
    ]
  },
...

```

```bash
git init
git flow init
```
