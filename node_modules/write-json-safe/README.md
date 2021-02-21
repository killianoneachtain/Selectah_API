<div align="center">
  <h1>write-json-safe</h1>
  <a href="https://npmjs.com/package/write-json-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/write-json-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/write-json-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/write-json-safe.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/write-json-safe?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/write-json-safe.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/write-json-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/write-json-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Write formatted JSON to a file.

## Installation

```sh
yarn add write-json-safe
```

```sh
npm install write-json-safe
```

## API

```ts
import { writeJSON, writeJSONSync, Options, JSONObject } from "write-json-safe";

function writeJSON(path: string, content?: JSONObject, options?: Options): Promise<boolean>;

function writeJSONSync(path: string, content?: JSONObject, options?: Options): boolean;

type Options = {
  /**
   * Output formatted JSON. Default: `true`
   */
  pretty?: boolean;
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
}
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/write-json-safe.svg"></h2>

- [stringify-json-object](https://www.npmjs.com/package/stringify-json-object): Stringify and format a JSON object
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files, and create parent directories if necessary

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/write-json-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/write-json-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [read-json-safe](https://www.npmjs.com/package/read-json-safe): Read JSON files without try catch
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files, and create parent directories if necessary
- [write-md-safe](https://www.npmjs.com/package/write-md-safe): Write markdown files from a [Marked](https://www.npmjs.com/package/marked) token list or string
