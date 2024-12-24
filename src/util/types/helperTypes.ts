// Helper type to generate all subsets of a union type
type Subsets<T extends string, U extends string = T> = [U] extends [never] ? []
    : U extends U ? [U, ...Subsets<Exclude<T, U>>] | Subsets<Exclude<T, U>>
    : never;

// Ensure the subsets are interpreted as arrays
type ArrayOfSubsets<T extends string> = Subsets<T> extends infer O
    ? O extends any[] ? O : never
    : never;

/**
 * String array that accepts any element at most once
 * @param T doesn't work properly if T === string, works well with union of strings
 */
export type TUniqueArray<T extends string = any> = ArrayOfSubsets<T>;

export type NonEmptyArray<T = any> = [T, ...T[]];

type AssertEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

export type AssertArrayType<T extends any[]> = T extends (infer U)[] ? U
    : never;

let a: string[] = [];
a.push('cosikdosi');
export const myFunc = (a: NonEmptyArray) => {
    a;
};
