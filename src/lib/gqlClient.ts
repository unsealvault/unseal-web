// api/client.ts
const GRAPHQL_ENDPOINT = "http://localhost:4001/graphql";

export const graphqlRequest = async (query: string, variables: Record<string, any> = {}) => {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await res.json();

  if (result.errors) {
    throw new Error(result.errors[0].message || "GraphQL Error");
  }

  return result.data;
};