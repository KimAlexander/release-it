import { execute } from './execute';

interface MakeBranchOptions {
  branchName: string;
  version: string;
}

export function makeNewBuildBranch(options: MakeBranchOptions): void {
  const { branchName, version } = options;
  const fullBranch = `build/${branchName}-${version}`;
  execute(`git checkout -b ${fullBranch}`);
}
