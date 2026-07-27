import { resolve } from "path";
import { execute } from "./shared/execute";
import { makeNewBuildBranch } from "./shared/make-new-build-branch";
import { cleanDirectory } from "./clean-directory";
import { deleteIfBranchAlreadyExists } from "./shared/delete-if-branch-already-exists";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export interface PublishOptions {
  path: string;
  customVersion?: string;
}

export async function publish(options: PublishOptions): Promise<void> {
  const { path, customVersion } = options;

  const packageJson = await import(resolve(path, "package.json"));
  const version = customVersion ?? packageJson.version;
  const branchName = packageJson.name.split("/").pop();

  await deleteIfBranchAlreadyExists({
    branchName,
    version,
  });

  makeNewBuildBranch({
    branchName,
    version,
  });

  cleanDirectory(".", {
    excludePaths: [
      "node_modules",
      "dist",
      ".angular",
      ".nx",
      ".git",
      ".gitignore",
    ],
  });

  execute(`cp -r ${path}/* ./`);
  execute("git add .");
  execute(`git commit -m "New version ${branchName}-${version}"`);
  execute(`git push -u origin build/${branchName}-${version} --force`);
  execute(
    `gh pr create --base build/${branchName} --head build/${branchName}-${version} --title "New build ${packageJson.name}@${version}" --body "New build ${packageJson.name}@${version}"`,
  );
  execute("git checkout main");

  await delay(2000);

  console.info(`${packageJson.name}@${version} is published successfully`);
}
