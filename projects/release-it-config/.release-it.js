module.exports = {
  git: {
    addUntrackedFiles: true,
    commitArgs: "--no-verify",
    commitMessage: "chore(release): v${version}",
    getLatestTagFromAllRefs: true,
    pushArgs: ["--follow-tags"],
    requireBranch: false,
    requireCleanWorkingDir: false,
    requireCommits: false,
    tagAnnotation: "Release v${version}",
    tagName: "v${version}",
  },

  hooks: {
    "after:release": "npm run release",
  },
  npm: {
    allowSameVersion: true,
    publish: false,
    skipChecks: true,
  },
  verbose: true,
};
