"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDirectory = cleanDirectory;
const execute_1 = require("./shared/execute");
function cleanDirectory(cleanPath, options) {
    const excludedPaths = options?.excludePaths || [];
    const excludeArgs = excludedPaths.map((path) => `-path "${cleanPath}/${path}"`).join(' -o ');
    const findCommand = `find ${cleanPath} -mindepth 1 -maxdepth 1 \\( ${excludeArgs} \\) -prune -o -exec rm -rf {} +`;
    (0, execute_1.execute)(findCommand);
}
//# sourceMappingURL=clean-directory.js.map