const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.GATSBY_APP_SUPABASE_URL || "empty"
const supabaseAnonKey = process.env.GATSBY_APP_SUPABASE_ANON_KEY || "empty"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const { data: conferences, conferenceError } = await supabase.from(
    "conferences"
  )

  const { data: profiles, profileError } = await supabase
    .from("profiles")
    .select("name,username")

  conferences.forEach(conference => {
    const nodeMeta = {
      id: createNodeId(`conference/${conference.name}`),
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

  profiles.forEach(profile => {
    const nodeMeta = {
      id: createNodeId(`user/${profile.username}`),
      parent: null,
      children: [],
      internal: {
        type: `Profile`,
        contentDigest: createContentDigest(profile),
      },
    }
    const node = Object.assign({}, profile, nodeMeta)
    createNode(node)
  })
}
