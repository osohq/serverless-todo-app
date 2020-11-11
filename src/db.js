/*
 * Promisified DynamoDB interface.
 */

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  params: { TableName: process.env.DYNAMODB_TABLE },
});

function getTodo(id) {
  return new Promise((resolve, reject) => {
    dynamoDb.get({ Key: { id } }, (err, result) => {
      if (err) return reject(err);
      if (result.Item === undefined) return reject({ statusCode: 404 });
      resolve(result.Item);
    });
  });
}

function listTodos() {
  return new Promise((resolve, reject) => {
    dynamoDb.scan({}, (err, result) => {
      if (err) return reject(err);
      resolve(result.Items);
    });
  });
}

function createTodo(todo) {
  return new Promise((resolve, reject) => {
    dynamoDb.put({ Item: todo }, (err) => {
      if (err) return reject(err);
      resolve(todo);
    });
  });
}

function updateTodo({ id, text, checked, requestTimeEpoch }) {
  const params = {
    Key: { id },
    ExpressionAttributeNames: { '#todo_text': 'text' },
    ExpressionAttributeValues: {
      ':text': text,
      ':checked': checked,
      ':updatedAt': requestTimeEpoch,
    },
    UpdateExpression:
      'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  return new Promise((resolve, reject) => {
    dynamoDb.update(params, (err, result) => {
      if (err) return reject(err);
      resolve(result.Attributes);
    });
  });
}

function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    dynamoDb.delete({ Key: { id } }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  getTodo,
  listTodos,
  deleteTodo,
  updateTodo,
  createTodo,
};
