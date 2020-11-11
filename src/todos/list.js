'use strict';

const { User } = require('../User');
const { listTodos } = require('../db');
const { error, success } = require('../helpers');

module.exports.list = async (event, _context, cb) => {
  try {
    const _user = User.fromEvent(event);

    // TODO: authorize access.

    const todos = await listTodos();
    success(cb, todos);
  } catch (e) {
    error(cb, e);
  }
};
