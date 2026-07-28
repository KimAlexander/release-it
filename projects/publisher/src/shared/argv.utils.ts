import process from 'process';

export function getValueByFlag<T extends string>(flag: string, fallback: T): T {
    const index = findIndexFlag(flag);

    if (index === -1) {
        return fallback;
    }

    const [parsedFlag, parsedValue] = process.argv[index]?.split(`=`) ?? [];
    const value =
        stringifier(parsedValue) ??
        (process.argv[index + 1]?.startsWith(`-`)
            ? fallback
            : stringifier(process.argv[index + 1]) ?? fallback);


    return value as T;
}

export function hasFlag(flag: string): boolean {
    return findIndexFlag(flag) !== -1;
}

export function findIndexFlag(flag: string): number {
    return process.argv.findIndex(arg => arg === flag || arg.split(`=`)[0] === flag);
}

export function stringifier(value?: string): string | undefined {
    return value === `undefined` || value === `null` ? undefined : value;
}