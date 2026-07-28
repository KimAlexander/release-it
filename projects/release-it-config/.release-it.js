module.exports = {
  git: {
    commitMessage: "chore(release): v${version}",
    tagAnnotation: "Release v${version}",
    tagName: "v${version}",
    commitArgs: "--no-verify",
    pushArgs: ["--follow-tags"],
    requireBranch: false,
    requireCleanWorkingDir: false,
    requireCommits: true,
    getLatestTagFromAllRefs: true,
    push: true,
  },

  hooks: {
    "before:release": "npm run release",
  },
};
