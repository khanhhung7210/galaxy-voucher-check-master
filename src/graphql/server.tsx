const API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";
import { createCipheriv, randomBytes } from "crypto";

export async function fetchGraphQL(query: string, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Thêm token nếu cần
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data;
}

const algorithm = "aes-256-cbc"; // Encryption algorithm
export function encryptId(id: string): string {
  try {
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, 'zwoGoq6Gd7wb6gGQv7DWkENGxABe3oiQ', iv);
    let encrypted = cipher.update(id, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
}