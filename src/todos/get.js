'use strict';

const { User } = require('../User');
const { getTodo } = require('../db');
const { error, success } = require('../helpers');

module.exports.get = async (event, _context, cb) => {
  try {
    const _user = User.fromEvent(event);
    const todo = await getTodo(event.pathParameters.id);

    // TODO: authorize access.

    success(cb, todo);
  } catch (e) {
    error(cb, e);
  }
};
