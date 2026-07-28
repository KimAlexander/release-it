"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIfBranchAlreadyExists = deleteIfBranchAlreadyExists;
const tslib_1 = require("tslib");
const child_process = tslib_1.__importStar(require("child_process"));
const util = tslib_1.__importStar(require("util"));
async function deleteIfBranchAlreadyExists(options) {
    const exec = util.promisify(child_process.exec);
    const fullBranch = `build/${options.branchName}-${options.version}`;
    const branchList = (await exec(`git branch --list ${fullBranch}`)).stdout;
    const branchExists = Boolean(branchList.trim());
    if (branchExists) {
        console.warn(`Branch "${fullBranch}" already exists and will be deleted.`);
        await exec(`git branch -D ${fullBranch}`);
    }
}
//# sourceMappingURL=delete-if-branch-already-exists.js.map