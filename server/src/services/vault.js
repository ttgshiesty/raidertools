import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms";
import { createDecipheriv, createHash } from "node:crypto";

const kms = new KMSClient({ region: process.env.AWS_REGION || 'us-east-2' });
const LOCAL_DEV_KEY_MARKER = "local-dev:v1";

export async function decryptToken(payload, ctx) {
    if (payload.encryptedDataKey === LOCAL_DEV_KEY_MARKER) {
        if (process.env.RAIDER_TOOLS_LOCAL_DEV !== "true") {
            throw new Error("Local-dev encrypted token cannot be decrypted outside local dev");
        }
        return decryptTokenLocalDev(payload);
    }

    const dec = await kms.send(new DecryptCommand({
        CiphertextBlob: Buffer.from(payload.encryptedDataKey, "base64"),
        EncryptionContext: ctx,
    }));
    if (!dec.Plaintext) throw new Error("KMS Decrypt returned empty plaintext");

    const decipher = createDecipheriv(
        "aes-256-gcm",
        dec.Plaintext,
        Buffer.from(payload.iv, "base64"),
    );
    decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
    const pt = Buffer.concat([
        decipher.update(Buffer.from(payload.ciphertext, "base64")),
        decipher.final(),
    ]);

    // Zero out the key in memory if it's a Uint8Array
    if (dec.Plaintext instanceof Uint8Array) {
        dec.Plaintext.fill(0);
    }

    return pt.toString("utf8");
}

function localDevKey() {
    const secret = process.env.LOCAL_TOKEN_ENCRYPTION_KEY;
    if (!secret) throw new Error("Missing LOCAL_TOKEN_ENCRYPTION_KEY");
    return createHash("sha256").update(secret, "utf8").digest();
}

function decryptTokenLocalDev(payload) {
    const decipher = createDecipheriv(
        "aes-256-gcm",
        localDevKey(),
        Buffer.from(payload.iv, "base64"),
    );
    decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
    const pt = Buffer.concat([
        decipher.update(Buffer.from(payload.ciphertext, "base64")),
        decipher.final(),
    ]);

    return pt.toString("utf8");
}
