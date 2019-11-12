const {  getUserId } = require('../utils')

async function transactions(parent, args, context) {
  getUserId(context)
  const where = {}
  where.title_contains = args.filter ? args.filter : undefined
  where.date_gte = args.begin ? args.begin : undefined
  where.date_lt = args.end ? args.end : undefined

  const transactions = await context.prisma.transactions({
    where,
    skip: args.skip,
    first: args.first
  })
  return transactions
}

module.exports = { transactions }