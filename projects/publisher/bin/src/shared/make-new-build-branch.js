"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNewBuildBranch = makeNewBuildBranch;
const execute_1 = require("./execute");
function makeNewBuildBranch(options) {
    const { branchName, version } = options;
    const fullBranch = `build/${branchName}-${version}`;
    (0, execute_1.execute)(`git checkout -b ${fullBranch}`);
}
//# sourceMappingURL=make-new-build-branch.js.map