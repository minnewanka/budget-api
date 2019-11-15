const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function post(parent, args, context) {
  const userId = getUserId(context);
  return context.prisma.createTransaction({
    date: args.date,
    title: args.title,
    amount: args.amount,
    proceeded: true,
    createdBy: { connect: { id: userId } }
  });
}

function deleteTransaction(parent, args, context) {
  getUserId(context);
  return context.prisma.deleteTransaction({
    id: args.id
  });
}

function updateTransaction(parent, args, context) {
  getUserId(context);
  const {
    data: { title, amount, date, proceeded }
  } = args;
  return context.prisma.updateTransaction({
    data: {
      title: title ? title : undefined,
      amount: amount ? amount : undefined,
      date: date ? date : undefined,
      proceeded: proceeded ? proceeded : false
    },
    where: { id: args.id }
  });
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

module.exports = { signup, login, post, deleteTransaction, updateTransaction };
