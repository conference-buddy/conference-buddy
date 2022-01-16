process.env.NODE_ENV = "production"

// eslint-disable-next-line
const { exec } = require("child_process")

// eslint-disable-next-line
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const url = process.env.GATSBY_APP_SUPABASE_URL
const apiKey = process.env.GATSBY_APP_SUPABASE_ANON_KEY

const command = `yarn openapi-typescript ${url}/rest/v1/\\?apikey\\=${apiKey} --output src/services/database/types/supabase.ts`

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
