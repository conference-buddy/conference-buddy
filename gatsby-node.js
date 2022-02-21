require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  let conferences = []
  let publicProfiles = []
  try {
    conferences = await (exports.getConferences =
      require("./src/domain/conferences").getConferences())

    publicProfiles = await (exports.getConferences =
      require("./src/domain/public-profiles").getPublicProfiles())
  } catch (error) {
    throw Error(error)
  }

  conferences.forEach(conference => {
    const nodeMeta = {
      id: conference.id,
      parent: null,
      children: [],
      internal: {
        type: `Conference`,
        contentDigest: createContentDigest(conference),
      },
    }
    const node = Object.assign({}, conference, nodeMeta)
    createNode(node)
  })

  publicProfiles.forEach(publicProfile => {
    const nodeMeta = {
      id: createNodeId(`user/${publicProfile.username}`),
      parent: null,
      children: [],
      internal: {
        type: `User`,
        contentDigest: createContentDigest(publicProfile),
      },
    }

    const node = Object.assign({}, publicProfile, nodeMeta)
    createNode(node)
  })
}
