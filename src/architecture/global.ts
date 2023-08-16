export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;
}

export function hasContent<T>(obj: T | null | undefined): boolean {
    if (isNullOrUndefined(obj)) {
        return false;
    }
}

export interface ISerilizable {
    to_serializable(): any;
}