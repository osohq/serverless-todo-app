'use strict';

const { User } = require('../User');
const { deleteTodo, getTodo } = require('../db');
const { error, success } = require('../helpers');

module.exports.delete = async (event, _context, cb) => {
  try {
    const _user = User.fromEvent(event);
    const { id } = event.pathParameters;
    const todo = await getTodo(id);

    // TODO: authorize access.

    await deleteTodo(id);
    success(cb, todo);
  } catch (e) {
    error(cb, e);
  }
};
