import {CommonExecOptions, execSync} from 'child_process';

export function execute(shell: string, options?: Partial<CommonExecOptions>): string {
    return execSync(
        shell,
        options ?? {
            stdio: `inherit`,
            encoding: `utf8`,
        },
    )
        ?.toString()
        .trim();
}
