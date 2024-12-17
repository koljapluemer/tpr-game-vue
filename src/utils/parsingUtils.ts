export function isArrayOfStrings(input: unknown): input is string[] {
    return Array.isArray(input) && input.every((item) => typeof item === "string");
}


export function isRecordOfStrings(input: unknown): input is Record<string, string> {
    return (
        typeof input === "object" &&                   // Check it's an object
        input !== null &&                             // Not null
        !Array.isArray(input) &&                      // Not an array
        Object.keys(input).every(
            (key) => typeof key === "string" && typeof (input as Record<string, unknown>)[key] === "string"
        )
    );
}


export function isTupleOfTwoStrings(input: unknown): input is [string, string] {
    return (
        Array.isArray(input) &&         // Ensure it's an array
        input.length === 2 &&           // Ensure the length is exactly 2
        typeof input[0] === "string" && // First element is a string
        typeof input[1] === "string"    // Second element is a string
    );
}

export function isTupleOfOneOrTwoStrings(input: unknown): input is [string] | [string, string] {
    return (
        Array.isArray(input) && // Check it's an array
        (input.length === 1 || input.length === 2) && // Check the length is 1 or 2
        input.every((el) => typeof el === "string") // All elements are strings
    );
}

export function getEnumValueIfValid<T extends Record<string, string | number>>(
    enumObj: T,
    value: string
): T[keyof T] | undefined {
    return Object.values(enumObj).includes(value) ? (value as T[keyof T]) : undefined;
}
