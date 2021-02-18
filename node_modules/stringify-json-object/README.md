<div align="center">
  <h1>stringify-json-object</h1>
  <a href="https://npmjs.com/package/stringify-json-object">
    <img alt="NPM" src="https://img.shields.io/npm/v/stringify-json-object.svg">
  </a>
  <a href="https://github.com/bconnorwhite/stringify-json-object">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/stringify-json-object.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/stringify-json-object?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/stringify-json-object.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/stringify-json-object">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/stringify-json-object?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Stringify and format a JSON object.

## Installation

```sh
yarn add stringify-json-object
```

```sh
npm install stringify-json-object
```

## API
```ts
import stringify, { isJSONObject, JSONObject, JSONValue, JSONArray } from "stringify-json-object";

stringify(json?: JSONValue, pretty = true) => string;

isJSONObject(json?: JSONValue) => boolean;

```

### Types
```ts
type JSONObject = {
  [key in string]?: JSONValue
};

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONArray extends Array<JSONValue> {};
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/stringify-json-object.svg"></h2>

- [json-types](https://www.npmjs.com/package/json-types): JSON TypeScript Definitions

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/stringify-json-object.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/stringify-json-object.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

<br />

## Related Packages

- [parse-json-object](https://www.npmjs.com/package/parse-json-object): Parse a typed JSON object
