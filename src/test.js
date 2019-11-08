const { prisma } = require('./generated/prisma-client')

async function main() {

  // Create a new link
  const newTransaction = await prisma.createTransaction({ 
    title: 'www.prisma.io',
    amount: 15,
    proceeded: true
  })
  console.log(`Created new Transaction: ${newTransaction.title} (ID: ${newTransaction.amount})`)

  // Read all links from the database and print them to the console
  const allTransactions = await prisma.transactions()
  console.log("allTransactions",  allTransactions)
}

main().catch(e => console.error(e))