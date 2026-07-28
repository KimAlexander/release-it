import { resolve } from 'path';
import { execute } from './shared/execute';
import { getValueByFlag } from './shared/argv.utils';
import { makeNewBuildBranch } from './shared/make-new-build-branch';
import { cleanDirectory } from './shared/clean-directory';
import { deleteIfBranchAlreadyExists } from './shared/delete-if-branch-already-exists';

// function delay(milliseconds: number): Promise<void> {
//     return new Promise((resolve) => {
//         setTimeout(resolve, milliseconds);
//     });
// }

const path = getValueByFlag<string>(`--path`, ``);

(async function main(): Promise<void> {
    const packageJson = await import(resolve(path, `package.json`));
    const version = getValueByFlag<string>(
        `--customVersion`,
        packageJson.version,
    );
    const branchName = packageJson.name.split('/').pop();
    const customTag = `${packageJson.name}-v${version}`;

    await deleteIfBranchAlreadyExists({
        branchName,
        version
    })

    await makeNewBuildBranch({
        branchName,
        version
    });

    // cleanDirectory('.', { excludePaths: ['node_modules', 'dist', '.angular', '.nx', '.git', '.gitignore'] });

    // execute(
    //     `cp -r ${path}/* ./`
    // );

    // execute(
    //     `git add .`
    // );

    // execute(
    //     `git commit -m "New version ${customTag}"`
    // );

    // execute(
    //     `git tag ${customTag}`
    // );

    // execute(
    //     `git push -u origin build/${branchName}-${version} --force`
    // );

    // execute(
    //     `git push origin --tags --force`
    // );

    // execute(
    //     `gh pr create --base build/${branchName} --head build/${branchName}-${version} --title "New build ${packageJson.name}@${version}" --body "New build ${packageJson.name}@${version}"`
    // );

    // execute(
    //     `git checkout main`
    // );

    console.info(`${packageJson.name}@${version} is published successfully`);
})();