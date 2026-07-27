module.exports = {
  git: {
    commitMessage: "chore(release): v${version}",
    tagName: "v${version}",
    push: true,
  },

  hooks: {
    "before:release": "npm run release",
  },
};
