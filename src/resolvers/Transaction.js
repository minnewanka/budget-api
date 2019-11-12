function createdBy(parent, args, context) {
  return context.prisma.transaction({ id: parent.id }).createdBy()
}

module.exports = {
  createdBy,
}