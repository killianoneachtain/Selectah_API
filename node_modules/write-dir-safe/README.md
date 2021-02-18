<div align="center">
  <a href="https://github.com/bconnorwhite/write-dir-safe">
    <img alt="write-dir-safe" src="assets/header.svg" />
  </a>
  <a href="https://npmjs.com/package/write-dir-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/write-dir-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/write-dir-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/write-dir-safe.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/write-dir-safe?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/write-dir-safe.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/write-dir-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/write-dir-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Create directories and their parents recursively.

- Returns `true` if directory now exists.
- Returns `false` if unable to create directory.
- Returns `undefined` on other errors (ex: permission denied) rather than throwing.

## Installation

```sh
yarn add write-dir-safe
```

```sh
npm install write-dir-safe
```

## API

```ts
import { writeDir, writeDirSync, Options } from "write-dir-safe";

function writeDir(path: string, options: Options): Promise<boolean | undefined>;

function writeDirSync(path: string, options: Options): boolean | undefined;

type Options = {
  /**
   * Recursively create parent directories as well. Default: `true`
   */
  recursive?: boolean;
}
```

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/write-dir-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for typescript projects
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/write-dir-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [read-dir-safe](https://www.npmjs.com/package/read-dir-safe): Read directories recursively or non-recursively
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files, and parent directories if necessary
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove a file without try catch
