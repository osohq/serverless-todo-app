'use strict';

const { User } = require('../User');
const { deleteTodo, getTodo } = require('../db');
const { error, may, success } = require('../helpers');

module.exports.delete = async (event, _context, cb) => {
  try {
    const user = User.fromEvent(event);
    const { id } = event.pathParameters;
    const todo = await getTodo(id);

    const authorized = await may(user, 'delete', todo);
    if (!authorized) return error(cb, { statusCode: 403 });

    await deleteTodo(id);
    success(cb, todo);
  } catch (e) {
    error(cb, e);
  }
};
