/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql } from 'apollo-server-express';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

const typeDefs: TypedDocumentNode = gql`
  type Product {
    id: ID!
    name: String!
    production_date: String!
    expiry_date: String!
    price: Float!
    image_url: String!
    entries: [Entry]
    description: String
  }

  type Entry {
    calories: Float!
    fat: Float!
    carbohydrates: Float!
    protein: Float!
  }
  type User {
    id: ID!
    username: String!
  }
  type UserAuth {
    id: ID!
    username: String!
    token: String!
  }

  type UserPublic {
  id: String!
  username: String!
}

  type Query {
    getUser(username: String!): User
    getProducts: [Product!]!
    getProduct(id: ID!): Product
  }

  type Mutation {
    addProduct(product: NewProduct!): Product!
    deleteProduct(id: ID!): Product
    addEntry(entry: EntryInput!, productId: ID!): Product
    createUser(username: String!, password: String!): UserPublic
    login(username: String!, password: String!): UserAuth
  }
 

  input NewProduct {
    name: String!
    production_date: String!
    expiry_date: String!
    price: Float!
    image_url: String!
    entries: [EntryInput]
    description: String
  }

  input EntryInput {
    calories: Float!
    fat: Float!
    carbohydrates: Float!
    protein: Float!
  }
`;

export default typeDefs;

