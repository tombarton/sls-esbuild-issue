import crypto from "crypto";

export const verifySignature = (signature: string, body: string) => {
  return (
    crypto.createHmac("sha256", "abc123").update(body).digest("hex") ===
    signature
  );
};
