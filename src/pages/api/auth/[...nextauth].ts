import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Sequelize } from "sequelize";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import SequelizeAdapter from "@next-auth/sequelize-adapter";

const client = new SecretManagerServiceClient({
  projectId: "thinking-case-340611",
});

async function getSecret(name: string) {
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  return version?.payload?.data?.toString() ?? "";
}

const getNextAuth = async () => {
  const user = await getSecret("db_username");
  const pass = await getSecret("db_pass");
  const host = await getSecret("db_host");
  const clientId = await getSecret("client_id");
  const clientSecret = await getSecret("client_secret");

  const mysqlConnectionString = `mysql://${user}:${pass}@${host}:3306/auth`;
  const sequelize = new Sequelize(mysqlConnectionString);
  sequelize.sync();

  const auth = NextAuth({
    providers: [
      GoogleProvider({
        clientId: clientId,
        clientSecret: clientSecret,
      }),
    ],
    secret: "my-super-secret-key",
    adapter: SequelizeAdapter(sequelize),
  });

  return auth;
};

export default getNextAuth;
