import type {JsonValue} from 'type-fest'
import type {Equal, Expect} from '@type-challenges/utils'
// eslint-disable-next-line import/no-unassigned-import
import './shim.js'

const parse1 = JSON.parse('true')
const parse2 = JSON.parse<boolean>('true')
const parse3 = JSON.parse('true', (_key, value) => {
	return value
})
type TestParse1 = Expect<Equal<typeof parse1, JsonValue>>
type TestParse2 = Expect<Equal<typeof parse2, boolean>>
type TestParse3 = Expect<Equal<typeof parse3, unknown>>

const stringify1 = JSON.stringify('foo')
const stringify2 = JSON.stringify({
	symbol: Symbol('foo'),
})

type TestStringify1 = Expect<Equal<typeof stringify1, string>>
type TestStringify2 = Expect<Equal<typeof stringify2, never>>
