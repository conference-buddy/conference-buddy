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

  let conferences = [{ id: "1", name: "testconf" }]

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
