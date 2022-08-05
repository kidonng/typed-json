import type {JsonValue} from 'type-fest'
import {expectType} from 'tsd'
// eslint-disable-next-line import/no-unassigned-import
import './shim.js'

const parse1 = JSON.parse('true')
const parse2 = JSON.parse<boolean>('true')
const parse3 = JSON.parse('true', (_key, value) => {
	return value
})
expectType<JsonValue>(parse1)
expectType<boolean>(parse2)
expectType<unknown>(parse3)

interface Foo {
	foo: string
}

const stringify1 = JSON.stringify('foo')
const stringify2 = JSON.stringify(Symbol('foo'))
const stringify3 = JSON.stringify({foo: 'bar'} as Foo)
const stringify4 = JSON.stringify({
	date: new Date(),
})
const stringify5 = JSON.stringify(Symbol('foo'), ['bar'])

expectType<string>(stringify1)
expectType<never>(stringify2)
expectType<string>(stringify3)
expectType<string>(stringify4)
expectType<never>(stringify5)
