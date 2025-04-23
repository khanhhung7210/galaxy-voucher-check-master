/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { request } from "graphql-request";

export default async function gqlRequest(document: any, variables?: any, requestHeaders?: any) {
  const headers: { [key: string]: any } = {};
  try {
    return await request(
      process.env.GRAPHQL_URL || "",
      document,
      variables || {},
      {
        ...requestHeaders,
        ...headers,
      }
    );
  } catch (err: any) {
    console.log(err, 'err');
  }
}

