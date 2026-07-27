import * as child_process from 'child_process';
import * as util from 'util';

export interface Options {
    branchName: string;
    version: string;
}

export async function deleteIfBranchAlreadyExists(options: Options): Promise<void> {
    const exec = util.promisify(child_process.exec);
    const fullBranch: string = `build/${options.branchName}-${options.version}`;

    const branchList: string = (await exec(`git branch --list ${fullBranch}`)).stdout;
    const branchExists: boolean = Boolean(branchList.trim());

    if (branchExists) {
        console.warn(`Branch "${fullBranch}" already exists and will be deleted.`);
        await exec(`git branch -D ${fullBranch}`);
    }
}
