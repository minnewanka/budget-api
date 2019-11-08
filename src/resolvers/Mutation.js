function post(parent, args, context) {
  return context.prisma.createTransaction({
    title: args.title,
    amount: args.amount,
    proceeded: args.proceeded,
  })
}

module.exports = { post }