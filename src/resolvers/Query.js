async function transactions(parent, args, context) {
  const transactions = await context.prisma.transactions()
  return transactions
}

module.exports = { transactions }