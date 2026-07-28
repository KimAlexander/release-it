"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = publish;
const path_1 = require("path");
const execute_1 = require("./shared/execute");
const make_new_build_branch_1 = require("./shared/make-new-build-branch");
const clean_directory_1 = require("./clean-directory");
const delete_if_branch_already_exists_1 = require("./shared/delete-if-branch-already-exists");
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
async function publish(options) {
    const { path, customVersion } = options;
    const packageJson = await Promise.resolve(`${(0, path_1.resolve)(path, "package.json")}`).then(s => __importStar(require(s)));
    const version = customVersion ?? packageJson.version;
    const branchName = packageJson.name.split("/").pop();
    await (0, delete_if_branch_already_exists_1.deleteIfBranchAlreadyExists)({
        branchName,
        version,
    });
    (0, make_new_build_branch_1.makeNewBuildBranch)({
        branchName,
        version,
    });
    (0, clean_directory_1.cleanDirectory)(".", {
        excludePaths: [
            "node_modules",
            "dist",
            ".angular",
            ".nx",
            ".git",
            ".gitignore",
        ],
    });
    (0, execute_1.execute)(`cp -r ${path}/* ./`);
    (0, execute_1.execute)("git add .");
    (0, execute_1.execute)(`git commit -m "New version ${branchName}-${version}"`);
    (0, execute_1.execute)(`git push -u origin build/${branchName}-${version} --force`);
    (0, execute_1.execute)(`gh pr create --base build/${branchName} --head build/${branchName}-${version} --title "New build ${packageJson.name}@${version}" --body "New build ${packageJson.name}@${version}"`);
    (0, execute_1.execute)("git checkout main");
    await delay(2000);
    console.info(`${packageJson.name}@${version} is published successfully`);
}
//# sourceMappingURL=index.js.map