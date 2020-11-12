'use strict';

const { v4: uuidv4 } = require('uuid');

const { User } = require('../User');
const { createTodo } = require('../db');
const { error, may, success } = require('../helpers');

module.exports.create = async (event, _context, cb) => {
  try {
    const creator = User.fromEvent(event);

    const authorized = await may(creator, 'create');
    if (!authorized) return error(cb, { statusCode: 403 });

    const { text } = JSON.parse(event.body);
    if (typeof text !== 'string') return error(cb, { statusCode: 422 }); // Bad value.

    const { requestTimeEpoch } = event.requestContext;
    const todo = {
      id: uuidv4(),
      creator,
      text,
      checked: false,
      createdAt: requestTimeEpoch,
      updatedAt: requestTimeEpoch,
    };

    const created = await createTodo(todo);
    success(cb, created, 201);
  } catch (e) {
    error(cb, e);
  }
};
