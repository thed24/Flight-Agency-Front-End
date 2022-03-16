import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();
let apiKey: string | undefined;

export const readApiKey = (): string | undefined => {
  if (apiKey) {
    return apiKey;
  }

  const requestKey = async () => {
    const secretResource = {
      name: "projects/620313617886/secrets/google-api-key/versions/1",
    };
    const [version] = await client.accessSecretVersion(secretResource);
    return version;
  };

  requestKey().then((version) => {
    if (version?.payload?.data) {
      apiKey = version.payload.data.toString();
    }
  });

  return apiKey;
};
