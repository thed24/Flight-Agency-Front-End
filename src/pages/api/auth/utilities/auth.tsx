import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = process.env.NEXT_PUBLIC_KEY
  ? new SecretManagerServiceClient({
      projectId: "thinking-case-340611",
      keyFilename: process.env.NEXT_PUBLIC_KEY,
    })
  : new SecretManagerServiceClient({
      projectId: "thinking-case-340611",
    });

export async function getSecret(name: string) {
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  return version?.payload?.data?.toString() ?? "";
}
