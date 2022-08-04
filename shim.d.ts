import type {JsonValue, Jsonify} from 'type-fest'

declare global {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface JSON {
		parse<T extends JsonValue>(text: string): T
		parse<T = unknown>(
			text: string,
			reviver: (this: unknown, key: string, value: unknown) => unknown,
		): T

		stringify<T>(
			value: T,
			replacer?: (this: unknown, key: string, value: unknown) => unknown,
			space?: string | number,
		): Jsonify<T> extends never ? never : string
	}
}
