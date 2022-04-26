const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const axios = require("axios");

const NASA_API_ROOT = "https://images-api.nasa.gov/search";
const NASA_PAGE_SIZE = 100;

const ImageType = new GraphQLObjectType({
  name: "Image",
  description: "Image data from Nasa Images API.",
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
    description: {
      type: GraphQLString,
      description: "Description of the image.",
      resolve: (parent) => parent.data[0].description,
    },
    uri: {
      type: GraphQLString,
      description: "Title of the image.",
      resolve: (parent) => parent.links[0].href,
    },
  }),
});

const ImageQueryType = new GraphQLObjectType({
  name: "ImageQueryType",
  description: "The results of an image query including meta data and results",
  fields: () => ({
    count: { type: GraphQLInt },
    items: { type: GraphQLList(ImageType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query.",
  fields: () => ({
    images: {
      type: ImageQueryType,
      description: "A list of Images from the Nasa Images API",
      args: {
        q: { type: GraphQLString },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve: async (parent, { q = "", limit = 20, offset = 0 }) => {
        // determine the nasa page for the first item in the requested group
        const pageLower = Math.floor(offset / NASA_PAGE_SIZE) + 1;
        // determine the nasa page for the last item in the requested group
        const pageUpper = Math.floor((offset + limit) / NASA_PAGE_SIZE) + 1;

        // base query to fetch images for a query q
        const nasaAPIQuery = {
          media_type: "image",
          q,
        };

        try {
          // fetch the nasa collection for the page which the first item in the group falls under
          const res = await axios.get(NASA_API_ROOT, {
            params: {
              ...nasaAPIQuery,
              page: pageLower,
            },
          });
          const count = res.data.collection.metadata.total_hits;
          const items = res.data.collection.items;

          if (pageUpper !== pageLower) {
            // if the page of the last item of the requested group falls on a separate page from the nasa api, fetch the items on this next page
            const resNext = await axios.get(NASA_API_ROOT, {
              params: {
                ...nasaAPIQuery,
                page: pageUpper,
              },
            });

            // append the next pages items to the first pages items
            items.concat(resNext.data.collection.items);
          }

          // determine the start index of the requested group
          const paginationStartIndex = offset % NASA_PAGE_SIZE;

          return {
            count,
            paginationStartIndex,
            // return the subset of the items array starting from the paginationStartIndex until paginationStartIndex + offset
            items: items.slice(
              paginationStartIndex,
              paginationStartIndex + limit
            ),
          };
        } catch (error) {
          console.log({ error });
          return { error };
        }
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query: RootQuery });
