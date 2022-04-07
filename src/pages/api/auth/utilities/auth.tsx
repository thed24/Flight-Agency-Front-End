import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient({
  projectId: "thinking-case-340611",
  keyFilename: "./secret.json",
});

export async function getSecret(name: string) {
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  return version?.payload?.data?.toString() ?? "";
}
