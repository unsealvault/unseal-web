// envConfig.ts
const envconfig = {
  graphqlApi: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  internalGraphqlApi: process.env.INTERNAL_GRAPHQL_URL || "http://localhost:4001/graphql",
  uploadthingToken: process.env.UPLOADTHING_TOKEN,
};

export default envconfig;
