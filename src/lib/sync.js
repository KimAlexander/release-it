import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'glob';
const INDENTATION = 4;
export function tuiSyncVersions(options) {
    const { ignorePackageNames, includePaths, matchPackageNames, newVersion } = options;
    const patterns = includePaths.map((pattern) => pattern.endsWith('.json')
        ? pattern
        : `${pattern}/**/*(package.json|package-lock.json)`);
    const files = patterns
        .map((pattern) => glob.sync(pattern, { ignore: '**/node_modules/**' }))
        .flatMap((files) => files)
        .filter((file) => !file.includes('node_modules'));
    for (const file of files) {
        const originalJSON = JSON.stringify(JSON.parse(readFileSync(file).toString()), null, INDENTATION);
        const packageJson = JSON.parse(originalJSON);
        const prevVersion = packageJson.version;
        if (!prevVersion) {
            continue;
        }
        tuiUpdatePackageJsonStructure({
            ignorePackageNames: ignorePackageNames ?? [],
            isPackageLockFile: file.endsWith('-lock.json'),
            matchPackageNames: matchPackageNames ?? [],
            newVersion,
            packageJson,
            prevVersion,
        });
        const updatedJSON = JSON.stringify(packageJson, null, 4);
        if (originalJSON === updatedJSON) {
            console.info(`[no changes]: ${file}`);
        }
        else {
            writeFileSync(file, `${updatedJSON}\n`);
            console.info(`[synchronized]: ${file}`);
        }
    }
}
export function tuiBumpDeps(options) {
    const { deps, ignorePackageNames, isPeerDependency, matchPackageNames, newVersion, prevVersion, } = options;
    for (const key of Object.keys(deps).filter((key) => tuiIsMatchedPackageName({
        ignorePackageNames: ignorePackageNames ?? [],
        matchPackageNames: matchPackageNames ?? [],
        name: key,
    }))) {
        const value = deps[key];
        if (typeof value === 'string') {
            deps[key] = isPeerDependency
                ? value.replace(prevVersion, newVersion)
                : `^${newVersion}`;
        }
        else if (deps[key]?.hasOwnProperty('requires')) {
            tuiBumpDeps({
                deps: value?.requires ?? {},
                ignorePackageNames,
                isPeerDependency,
                matchPackageNames,
                newVersion,
                prevVersion,
            });
        }
    }
}
export function tuiIsMatchedPackageName(options) {
    const { ignorePackageNames, matchPackageNames, name } = options;
    return name && ignorePackageNames.includes(name)
        ? false
        : !!matchPackageNames.find((match) => !!name?.match(new RegExp(match)));
}
export function tuiUpdatePackageJsonStructure({ ignorePackageNames, isPackageLockFile, matchPackageNames, newVersion, packageJson, prevVersion, }) {
    const { dependencies, devDependencies, name, packages, peerDependencies } = packageJson;
    if (typeof name === 'string' &&
        tuiIsMatchedPackageName({ ignorePackageNames, matchPackageNames, name })) {
        if ('version' in packageJson && typeof packageJson['version'] === 'string') {
            packageJson['version'] = newVersion;
        }
    }
    if (isObject(dependencies)) {
        tuiBumpDeps({
            deps: dependencies,
            ignorePackageNames,
            matchPackageNames,
            newVersion,
            prevVersion,
        });
    }
    if (isObject(peerDependencies)) {
        tuiBumpDeps({
            deps: peerDependencies,
            ignorePackageNames,
            isPeerDependency: true,
            matchPackageNames,
            newVersion,
            prevVersion,
        });
    }
    if (isObject(devDependencies)) {
        tuiBumpDeps({
            deps: devDependencies,
            ignorePackageNames,
            matchPackageNames,
            newVersion,
            prevVersion,
        });
    }
    if (isPackageLockFile && isObject(packages)) {
        for (const packageLockJson of Object.values(packages)) {
            if (!tuiIsMatchedPackageName({
                ignorePackageNames,
                matchPackageNames,
                name: packageLockJson?.name,
            })) {
                continue;
            }
            tuiUpdatePackageJsonStructure({
                ignorePackageNames,
                isPackageLockFile: true,
                matchPackageNames,
                newVersion,
                packageJson: packageLockJson,
                prevVersion,
            });
        }
    }
}
function isObject(value) {
    return typeof value === 'object' && !!value;
}
