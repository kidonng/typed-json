# typed-json

> Better typed [`JSON.parse`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [`JSON.stringify`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## Install

```sh
npm install @kidonng/typed-json
```

## Usage

This is a type-only module and does not contain any runtime code.

```ts
import type {} from '@kidonng/typed-json'

JSON.parse('true') // => JsonValue
JSON.parse<boolean>('true') // => boolean

JSON.stringify({foo: 'bar'}) // => string
JSON.stringify(Symbol('foo')) // => never
```

[_TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAcgAIGtgBMIDssHMD0MAnmAKboC0AVgM7YIBQDAUgMoDyAcgHRgCGUGqQAUCGFACupBAEo4+fHAC8APjjM6WAGp8ANlJYce-QaQA8AIwgRdpPlhWjxU2fMWq4Vm3axM2XbhpxYDxgADMiYQBvMOsALkQLAQQAXzkFZTUgqBDcQwDs3PDI1iIQK11RWIhZdPc1LFIAN1IoIA)

## Motivation

The built-in `JSON` object is [loosely typed by default](https://github.com/microsoft/TypeScript/blob/5c1abd300d39e81f6a5eed9a6eb66a3cff45ea46/lib/lib.es5.d.ts#L1052-L1074):

<!-- prettier-ignore -->
```ts
interface JSON {
    parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}
```

This poses potential issues when using `JSON.parse` and `JSON.stringify`:

- Developers tend to forget type checking `JSON.parse` return values
- Developers may mistakenly pass a non-serializable value to `JSON.stringify`

With typed-json:

- `JSON.parse` returns [`JsonValue`](https://github.com/sindresorhus/type-fest/blob/96bf69d14834bb7d2450e276f8199fbb69e3642c/source/basic.d.ts#L45) which matches any valid JSON value and enables type checking.
- `JSON.stringify` returns [`never`](https://www.typescriptlang.org/docs/handbook/2/functions.html#never) if the value can not be [`Jsonify`](https://github.com/sindresorhus/type-fest/blob/main/source/jsonify.d.ts) and prevents the result from being used.

typed-json also enforces stricter types when using the `reviver` option of `JSON.parse`, and `replacer` option of `JSON.stringify`:

```ts
import '@kidonng/typed-json'

JSON.parse('true', (key, value) => {
	return value // `unknown`
}) // return `unknown` when using a reviver

JSON.stringify({foo: 'bar'}, (key, value) => {
	return value // `unknown`
})
```

[_TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAcgAIGtgBMIDssHMD0MAnmAKboC0AVgM7YIBQDAUgMoDyAcgHRgCGUGqQAUCGFACupBABo4wlKSJyAbnwA2UgJRwAvAD44AbwYBIKKRgSoWOGs2k4+fHAAGErCiwQA7llcMAL46znAWVjZuHl6+-nA+ABakthI0wHhwfGGkKsAqpFBMbFzcNOLpuMAAZkTCRlUQEABciABGAgiBcgpKqhraeoYm5pbWtvZSTi7unt5+AcFAA)

## See Also

- [load-json-file](https://github.com/sindresorhus/load-json-file)
- [write-json-file](https://github.com/sindresorhus/write-json-file)
- [typed-query-selector](https://github.com/g-plane/typed-query-selector)
