'use strict';

const { User } = require('../User');
const { getTodo, updateTodo } = require('../db');
const { error, may, success } = require('../helpers');

module.exports.update = async (event, _context, cb) => {
  try {
    const user = User.fromEvent(event);
    const { id } = event.pathParameters;
    const todo = await getTodo(id);

    const authorized = await may(user, 'update', todo);
    if (!authorized) return error(cb, { statusCode: 403 });

    let { text, checked } = JSON.parse(event.body);
    // Error if missing both fields.
    if (!text && !checked) return error(cb, { statusCode: 422 });
    // Error on bad values for either field.
    if (text && typeof text !== 'string') return error(cb, { statusCode: 422 });
    if (checked && typeof checked !== 'boolean')
      return error(cb, { statusCode: 422 });

    // If only supplied a single field, use the existing value for the other.
    text = text || todo.text;
    checked = checked || todo.checked;

    const { requestTimeEpoch } = event.requestContext;
    const updated = await updateTodo({ id, text, checked, requestTimeEpoch });
    success(cb, updated);
  } catch (e) {
    error(cb, e);
  }
};
