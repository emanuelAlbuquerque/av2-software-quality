export interface Validator<T> {
    execute(input: T): Promise<string | null> | string | null
}