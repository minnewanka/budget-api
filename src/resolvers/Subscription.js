function newTransactionSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .transaction({ mutation_in: ["CREATED"] })
    .node();
}

function deletedTransactionSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .transaction({ mutation_in: ["DELETED"] })
    .previousValues();
}

const newTransaction = {
  subscribe: newTransactionSubscribe,
  resolve: payload => {
    return payload;
  }
};

const deletedTransaction = {
  subscribe: deletedTransactionSubscribe,
  resolve: payload => {
    console.log("payload", payload);
    return payload;
  }
};

module.exports = { newTransaction, deletedTransaction };
