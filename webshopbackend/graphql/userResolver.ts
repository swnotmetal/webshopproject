/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { UserPublic, UserAuthResponse } from "../types";
import appSer from "../services/appSer";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

const user_resolver = {
  Query: {
    getUser: async (_: unknown, { username }: { username: string }): Promise<UserPublic | null> => {
      const user = await appSer.findUserByUsername(username);
      if (!user) {
        throw new GraphQLError("User not found", { extensions: { code: "USER_NOT_FOUND" } });
      }
      return { id: user.id, username: user.username };
    },
  },
  Mutation: {
    createUser: async (_: unknown, { username, password }: { username: string, password: string }): Promise<UserPublic> => {
      try {
        const existingUser = await appSer.findUserByUsername(username);
        if (existingUser) {
          throw new GraphQLError("Username already exists", { extensions: { code: "USERNAME_EXISTS" } });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await appSer.createUser(username, hashedPassword);

        if (!newUser) {
          throw new GraphQLError("Failed to create user", { extensions: { code: "USER_CREATION_FAILED" } });
        }

        return { id: newUser.id, username: newUser.username };
      } catch (error) {
        console.error("Error in createUser resolver:", error);
        throw new GraphQLError("Internal server error", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
    login: async (_: unknown, { username, password }: { username: string, password: string }): Promise<UserAuthResponse> => {
      try {
        const user = await appSer.findUserByUsername(username);

        if (!user) {
          throw new GraphQLError("Invalid username or password", { extensions: { code: "INVALID_CREDENTIALS" } });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new GraphQLError("Invalid username or password", { extensions: { code: "INVALID_CREDENTIALS" } });
        }

        const token = await appSer.userLogin(username, password);

        if (!token) {
          throw new GraphQLError("Failed to generate token", { extensions: { code: "TOKEN_GENERATION_FAILED" } });
        }

        return token;
      } catch (error) {
        console.error("Error in login resolver:", error);
        throw new GraphQLError("Internal server error", { extensions: { code: "INTERNAL_SERVER_ERROR" } });
      }
    },
  },
};

export default user_resolver;