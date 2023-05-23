process.env.NODE_ENV = "development"

// eslint-disable-next-line
const { exec } = require("child_process")

// eslint-disable-next-line
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const projectId = process.env.GATSBY_APP_SUPABASE_PROJECT_ID
process.env.SUPABASE_ACCESS_TOKEN = process.env.GATSBY_APP_SUPABASE_ACCESS_TOKEN

const command = `npx supabase gen types typescript --project-id "${projectId}" > ./src/domain/_database/types.ts`

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
