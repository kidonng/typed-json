# typed-json

> Better typed [`JSON.parse`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [`JSON.stringify`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## Install

```sh
npm install @kidonng/typed-json
```

## Usage

This is a type-only module and does not contain any runtime code.

```ts
import '@kidonng/typed-json'
// Use a type-only import (more compatible with bundlers)
import type {} from '@kidonng/typed-json'

JSON.parse('true') // => JsonValue
JSON.parse<boolean>('true') // => boolean
JSON.parse('true', (key, value) => {
	return value // `unknown`, instead of `any`
})

JSON.stringify({foo: 'bar'}) // => string
JSON.stringify({symbol: Symbol('foo')}) // => never
JSON.stringify({foo: 'bar'}, (key, value) => {
	return value // `unknown`, instead of `any`
})
```

- [`JsonValue`](https://github.com/sindresorhus/type-fest/blob/96bf69d14834bb7d2450e276f8199fbb69e3642c/source/basic.d.ts#L45) matches any valid JSON value.
- `JSON.stringify` returns [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) if the value does not match `JsonValue` and prevents the result from being used.

  This is to make sure the value preserve their original identity when serialized, and prevent you from mistakenly passing a value of wrong types.

  However, it does not consider [`toJSON()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior). You can cast the type to `string` or call `toJSON()` manually if you rely on this behavior.

## See Also

- [typed-query-selector](https://github.com/g-plane/typed-query-selector)
