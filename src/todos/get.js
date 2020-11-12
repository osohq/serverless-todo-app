'use strict';

const { User } = require('../User');
const { getTodo } = require('../db');
const { error, may, success } = require('../helpers');

module.exports.get = async (event, _context, cb) => {
  try {
    const user = User.fromEvent(event);
    const todo = await getTodo(event.pathParameters.id);

    const authorized = await may(user, 'update', todo);
    if (!authorized) return error(cb, { statusCode: 403 });

    success(cb, todo);
  } catch (e) {
    error(cb, e);
  }
};
