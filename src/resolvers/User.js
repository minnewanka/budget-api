function transactions(parent, args, context) {
  return context.prisma.user({ id: parent.id }).transactions()
}

module.exports = {
  transactions,
}