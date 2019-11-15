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
function updatedTransactionSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe
    .transaction({ mutation_in: ["UPDATED"] })
    .node();
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

const updatedTransaction = {
  subscribe: updatedTransactionSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = { newTransaction, deletedTransaction, updatedTransaction };
