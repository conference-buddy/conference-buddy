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
          type: `Conference`,
          contentDigest: createContentDigest(conference),
        },
      }
      const node = Object.assign({}, conference, nodeMeta)
      createNode(node)
    })
  } catch (error) {
    throw Error(error)
  }

  try {
    console.log("TRY")
    const publicProfiles = await (exports.getPublicProfiles =
      require("./src/domain/public-profiles").getPublicProfiles())
    publicProfiles.forEach(publicProfile => {
      console.log("publicProfiles", publicProfile.social_links)
      const test = createContentDigest(publicProfile)

      console.log("digest", test)
      const nodeMeta = {
        id: `user/${publicProfile.username}`,
        username: publicProfile.username,
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
  } catch (error) {
    throw Error(error)
  }
}
