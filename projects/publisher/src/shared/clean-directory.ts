import { execute } from './execute';

export function cleanDirectory(cleanPath: string, options?: { excludePaths: string[] }) {
    const excludedPaths = options?.excludePaths || [];
    const excludeArgs = excludedPaths.map((path) => `-path "${cleanPath}/${path}"`).join(' -o ');
    const findCommand = `find ${cleanPath} -mindepth 1 -maxdepth 1 \\( ${excludeArgs} \\) -prune -o -exec rm -rf {} +`;

    execute(findCommand);
}
