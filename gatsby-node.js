require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions

  try {
    const conferences = await (exports.getConferences =
      require("./src/domain/conferences").getConferences())
    conferences.forEach(conference => {
      const nodeMeta = {
        id: conference.id,
        parent: null,
        children: [],
        internal: {
          type: `Conferences`,
          contentDigest: createContentDigest(conference),
        },
      }
      const node = Object.assign({}, conference, nodeMeta)
      createNode(node)
    })
  } catch (error) {
    throw Error(error)
  }
}
