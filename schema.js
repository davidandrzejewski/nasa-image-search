const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const axios = require("axios");

const NASA_API_ROOT = "https://images-api.nasa.gov/search";
const NASA_API_KEY = process.env.NASA_API_KEY;

const ImageType = new GraphQLObjectType({
  name: "Image",
  description: "Image uri and description from Nasa Images API.",
  fields: () => ({
    id: {
      type: GraphQLString,
      description: "unique identifier for the image.",
      resolve: (parent) => parent.data[0].nasa_id,
    },
    title: {
      type: GraphQLString,
      description: "Title of the image.",
      resolve: (parent) => parent.data[0].title,
    },
    uri: {
      type: GraphQLString,
      description: "Title of the image.",
      resolve: (parent) => parent.links[0].href,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query.",
  fields: () => ({
    images: {
      type: new GraphQLList(ImageType),
      description: "A list of Images from the Nasa Images API",
      args: {
        q: { type: GraphQLString },
        from: { type: GraphQLInt },
      },
      resolve: async (parent, { q, from }) => {
        const res = await axios.get(NASA_API_ROOT, {
          params: {
            api_key: NASA_API_KEY,
            media_type: "image",
            q,
            page: from,
          },
        });

        return res.data.collection.items;
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query: RootQuery });
