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

  let conferences
  try {
    conferences = await (exports.getConferences =
      require("./src/domain/conferences").getConferences())
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
}
