'use strict';

const { User } = require('../User');
const { listTodos } = require('../db');
const { error, may, success } = require('../helpers');

module.exports.list = async (event, _context, cb) => {
  try {
    const user = User.fromEvent(event);

    const authorized = await may(user, 'list');
    if (!authorized) return error(cb, { statusCode: 403 });

    const todos = await listTodos();
    success(cb, todos);
  } catch (e) {
    error(cb, e);
  }
};
