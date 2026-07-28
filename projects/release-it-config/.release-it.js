module.exports = {
  git: {
    commitMessage: "chore(release): v${version}",
    tagAnnotation: "Release v${version}",
    tagName: "v${version}",
    commitArgs: "--no-verify",
    pushArgs: ["--follow-tags"],
    requireBranch: false,
    requireCleanWorkingDir: false,
    requireCommits: false,
    getLatestTagFromAllRefs: true,
    push: true,
    commit: true,
  },

  hooks: {
    "before:release": "npm run release",
  },
};
