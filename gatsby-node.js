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

  const { data: conferences, error } = await supabase.from("conferences")

  conferences.forEach(conference => {
    const nodeMeta = {
      id: createNodeId(`conference-${conference.id}`),
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
