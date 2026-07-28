"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const child_process_1 = require("child_process");
function execute(shell, options) {
    return (0, child_process_1.execSync)(shell, options ?? {
        stdio: `inherit`,
        encoding: `utf8`,
    })
        ?.toString()
        .trim();
}
//# sourceMappingURL=execute.js.map