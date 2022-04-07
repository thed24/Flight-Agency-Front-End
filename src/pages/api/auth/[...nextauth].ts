import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Sequelize } from "sequelize";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { getSecret } from "./utilities/auth";

let dbConn: Sequelize | null = null;

const setUpDb = async () => {
  const user = await getSecret("db_username");
  const pass = await getSecret("db_pass");
  const host = await getSecret("db_host");

  const mysqlConnectionString = `mysql://${user}:${pass}@${host}:3306/auth`;
  const sequelize = new Sequelize(mysqlConnectionString);
  sequelize.sync();

  return sequelize;
};

const getNextAuth = async () => {
  const clientId = await getSecret("client_id");
  const clientSecret = await getSecret("client_secret");

  if (dbConn === null) {
    dbConn = await setUpDb();
  }

  const auth = NextAuth({
    providers: [
      GoogleProvider({
        clientId: clientId,
        clientSecret: clientSecret,
      }),
    ],
    secret: "my-super-secret-key",
    adapter: SequelizeAdapter(dbConn),
  });

  return auth;
};

export default getNextAuth;
