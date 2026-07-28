interface BumpDepsOptions {
    deps: Record<string, Record<string, unknown> | string>;
    isPeerDependency?: boolean;
    newVersion: string;
    prevVersion: string;
    matchPackageNames?: readonly string[];
    ignorePackageNames?: readonly string[];
}
interface Options {
    newVersion: string;
    includePaths: readonly string[];
    matchPackageNames?: readonly string[];
    ignorePackageNames?: readonly string[];
}
export declare function tuiSyncVersions(options: Options): void;
export declare function tuiBumpDeps(options: BumpDepsOptions): void;
interface MatchedOptions {
    name: string | undefined;
    matchPackageNames: readonly string[];
    ignorePackageNames: readonly string[];
}
export declare function tuiIsMatchedPackageName(options: MatchedOptions): boolean;
interface UpdatePackageJsonOptions {
    isPackageLockFile: boolean;
    newVersion: string;
    prevVersion: string;
    packageJson: Record<string, Record<string, any> | string>;
    matchPackageNames: readonly string[];
    ignorePackageNames: readonly string[];
}
export declare function tuiUpdatePackageJsonStructure({ ignorePackageNames, isPackageLockFile, matchPackageNames, newVersion, packageJson, prevVersion, }: UpdatePackageJsonOptions): void;
export {};
