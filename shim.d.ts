import type {JsonValue} from 'type-fest'

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface JSON {
		parse<T extends JsonValue>(text: string): T
		parse<T = unknown>(
			text: string,
			reviver: (this: unknown, key: string, value: unknown) => unknown,
		): T

		stringify(
			value: JsonValue,
			replacer?: (this: unknown, key: string, value: unknown) => unknown,
			space?: string | number,
		): string
		stringify(
			value: unknown,
			replacer?: (this: unknown, key: string, value: unknown) => unknown,
			space?: string | number,
		): never
	}
}
