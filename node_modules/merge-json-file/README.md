<div align="center">
  <h1>merge-json-file</h1>
  <a href="https://npmjs.com/package/merge-json-file">
    <img alt="NPM" src="https://img.shields.io/npm/v/merge-json-file.svg">
  </a>
  <a href="https://github.com/bconnorwhite/merge-json-file">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/merge-json-file.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/merge-json-file?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/merge-json-file.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/merge-json-file">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/merge-json-file?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Merge a JSON file with a JSON object.

## Installation

```sh
yarn add merge-json-file
```

```sh
npm install merge-json-file
```

## API

### Usage

#### For existing files:
```ts
import { mergeJSON } from "merge-json-file";

// old-file.json (before):
// {
//  "ok": true
// }
//
mergeJSON("old-file.json", { test: 1 });

// old-file.json (after):
// {
//   "ok": true,
//   "test": 1
// }
//
```

#### For new files:
```ts
import { mergeJSON } from "merge-json-file";

mergeJSON("new-file.json", { test: 1 });

// new-file.json:
// {
//   "test": 1
// }
//

```

### Types
```ts
import { mergeJSON, mergeJSONSync, JSONObject } from "merge-json-file";

function mergeJSON(path: string, object: JSONObject, options?: Options): Promise<boolean>;

function mergeJSONSync(path: string, object: JSONObject, options?: Options): boolean;

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

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/merge-json-file.svg"></h2>

- [deepmerge](https://www.npmjs.com/package/deepmerge): A library for deep (recursive) merging of Javascript objects
- [read-json-safe](https://www.npmjs.com/package/read-json-safe): Read JSON files without try catch
- [write-json-safe](https://www.npmjs.com/package/write-json-safe): Write formatted JSON to a file

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/merge-json-file.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): undefined
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/merge-json-file.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [read-json-safe](https://www.npmjs.com/package/read-json-safe): Read JSON files without try catch
- [write-json-safe](https://www.npmjs.com/package/write-json-safe): Write formatted JSON to a file
