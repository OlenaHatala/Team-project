const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

const User = require("../model/User");

const testUser = {id: 'ws', name: 'Andrii'};

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email };
}

async function get(email, password) {
  //
  // const storedData = await readData();

  // if (!storedData.users || storedData.users.length === 0) {
  //   throw new NotFoundError('Could not find any users.');
  // }

  // const user = storedData.users.find((ev) => ev.email === email);
  // if (!user) {
  //   throw new NotFoundError('Could not find user for email ' + email);
  // }

  // return user;

  console.log(password);

  const user = await User.findOne({ email, password });
    if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }
  return user;
}

async function getById(id) {
  //
  const storedData = await readData();

  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.users.find((ev) => ev.id === id);
  if (!user) {
    throw new NotFoundError('Could not find user for id ' + id);
  }

  return user;
}

async function replaceUser(id, data) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const index = storedData.users.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find user for id ' + id);
  }

  storedData.users[index] = { ...storedData.users[index], ...data};

  console.log(storedData.users[index]);

  await writeData(storedData);
}


exports.add = add;
exports.get = get;
exports.getById = getById;
exports.replaceUser = replaceUser;
//exports.getAccount = getAccount;
