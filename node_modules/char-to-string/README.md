<div align="center">
  <h1>char-to-string</h1>
  <a href="https://npmjs.com/package/char-to-string">
    <img alt="NPM" src="https://img.shields.io/npm/v/char-to-string.svg">
  </a>
  <a href="https://github.com/bconnorwhite/char-to-string">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/char-to-string.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/char-to-string?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/char-to-string.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/char-to-string">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/char-to-string?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Convert a character or character code to string.

## Installation

```sh
yarn add char-to-string
```

```sh
npm install char-to-string
```

## API

### Usage
```ts
import charToString from "char-to-string";

charToString("a"); // "a"

charToString(97); // "a"

charToString("abc"); // "a"
```

### Types
```ts
import charToString from "char-to-string";

function charToString(char: string | number): string;
```

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/char-to-string.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/char-to-string.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)
