const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const path = require("path");
const schema = require("./schema");

// For environment variables in local environment
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Cross-Origin Resource Sharing for local development
app.use(cors());

app.use("/graphql", graphqlHTTP({ graphiql: true, schema }));

app.use(express.static("public"));

// Serve front end Javascript files for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
