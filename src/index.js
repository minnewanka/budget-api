const { GraphQLServer } = require('graphql-yoga')

let transactions = [{
  id: '1',
  title: "title",
  amount: 10,
  proceeded: true
}]

let idCount = transactions.length
const resolvers = {
  Query: {
    transaction: () => transactions
  },
  Mutation: {
    post: (parent, args) => {
       const transaction = {
        id: `transaction-${idCount++}`,
        title: args.title,
        amount: args.amount,
        proceeded: args.proceeded,
      }
      transactions.push(transaction)
      return transaction
    }
  },
  Transaction: {
    id: (parent) => parent.id,
    title: (parent) => parent.title,
    amount: (parent) => parent.amount,
    proceeded: (parent) => parent.proceeded,
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))