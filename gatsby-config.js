/* eslint @typescript-eslint/explicit-module-boundary-types: "off" */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/web/pages`,
      },
    },
  ],
}
