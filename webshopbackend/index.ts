/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import userModel from './models/Users';
import typeDefs from './graphql/schema'; // Adjust the import paths as necessary
import userResolver from './graphql/userResolver';
import productResolver from './graphql/productResolver';
import db from './config/db';

interface MyContext {
  req: express.Request;
  currentUser?: any;
}

async function startServer() {
  await db();
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers: [userResolver, productResolver],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        let currentUser = null;

        if (token) {
          try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
            if (typeof decodedToken !== 'string' && 'id' in decodedToken) {
              currentUser = await userModel.findById(decodedToken.id);
            }
          } catch (error) {
            console.error('Error verifying token:', error);
          }
        }

        return { req, currentUser };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
});