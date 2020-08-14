/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "playpet(플레이펫)",
    titleTemplate: "%s · The Real Hero",
    description: "플레이펫 - 반려동물이 더 나은 세상을 위해 노력합니다",
    author: "playpet",
    siteUrl: "https://plapet.me",
    image: "/appicon.png", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: true,
          firestore: true,
          storage: true,
          messaging: false,
          functions: true,
          performance: false,
          analytics: true,
        },
        credentials: {
          apiKey: "AIzaSyCczK8wxmdEFMyWL9Nwm4jXOrk31_kg_fw",
          authDomain: "playpet-5b432.firebaseapp.com",
          databaseURL: "https://playpet-5b432.firebaseio.com",
          projectId: "playpet-5b432",
          storageBucket: "playpet-5b432.appspot.com",
          messagingSenderId: "386527552204",
          appId: "1:386527552204:web:84b4421b5fd7db5582d869",
          measurementId: "G-3MRGE501JY",
        },
      },
    },
  ],
}
