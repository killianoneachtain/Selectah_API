<div align="center">
  <h1>read-json-safe</h1>
  <a href="https://npmjs.com/package/read-json-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/read-json-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/read-json-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/read-json-safe.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/read-json-safe?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/read-json-safe.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/read-json-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/read-json-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Read JSON files without try catch.

Returns `undefined` on errors, for example if the file does not exist.

## Installation

```sh
yarn add read-json-safe
```

```sh
npm install read-json-safe
```

## API

### Read a JSONValue:

```ts
import { readJSON, readJSONSync, JSONValue } from "read-json-safe";

function readJSON(path: string): Promise<JSONValue | undefined>;

function readJSONSync(path: string): JSONValue | undefined;

type JSONValue = string | number | boolean | JSONObject | JSONArray | null;
```

### Read a JSONObject:

```ts
import { readJSONObject, readJSONObjectSync, JSONObject } from "read-json-safe";

function readJSONObject(path: string): Promise<JSONObject| undefined>;

function readJSONObjectSync(path: string): JSONObject| undefined;

type JSONObject = {
    [key: string]: JSONValue;
}
```

### Read a JSONArray:

```ts
import { readJSONArray, readJSONArraySync, JSONArray } from "read-json-safe";

function readJSONArray(path: string): Promise<JSONArray | undefined>;

function readJSONArraySync(path: string): JSONArray | undefined;

type JSONArray = Array<JSONValue>;
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/read-json-safe.svg"></h2>

- [parse-json-object](https://www.npmjs.com/package/parse-json-object): Parse a typed JSON object
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/read-json-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): undefined
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/read-json-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch
- [read-lcov-safe](https://www.npmjs.com/package/read-lcov-safe): Read and parse an lcov file without try catch
- [read-md-safe](https://www.npmjs.com/package/read-md-safe): Read markdown files as a [Marked](https://www.npmjs.com/package/marked) token list or string
