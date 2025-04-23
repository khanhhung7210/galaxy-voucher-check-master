import { createDecipheriv } from "crypto";
import { createCipheriv, randomBytes } from "crypto";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;
export const decryptId = (encryptedId: string): string => {
  try {
    const newStr = encryptedId.replace(/%3A/g, ':').replace(/%/g, ':');
    const [ivHex, encrypted] = newStr.split(":");
 
    const iv = Buffer.from(ivHex, "hex");
    const decipher = createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};

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