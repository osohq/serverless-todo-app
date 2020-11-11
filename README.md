# Adding authorization to a serverless Node.js app

<!-- TODO: Add link to blog once it's published. -->

Original project forked from
https://github.com/serverless/examples/tree/c8ef3727917b19ff9b5cae72862a520dabae273a/aws-node-rest-api-with-dynamodb.

This example demonstrates how to use oso to add fine-grained authorization to a
serverless app. The app uses [Serverless][serverless] to manage AWS resources.
It consists of five Lambda functions (fronted by API Gateway) covering the
basic CRUD operations on top of a single DynamoDB table. To track ownership,
each todo has a `creator` field that contains a `User` populated with a few
fields from the Lambda event payload: `country`, `sourceIp`, and `userAgent`.

[serverless]: https://github.com/serverless/serverless

The `main` branch contains the bare application code with no authorization. The
`authorized` branch contains the code with authorization in place. You can
[diff the two branches][diff] to see the authorization footprint.

[diff]: https://github.com/osohq/serverless-todo-app/compare/authorized

## Steps

- Clone this repo and `cd` into it.

- Install dependencies with `npm install`.

- [Set up AWS credentials for Serverless][serverless-credentials].

- Deploy the application with `npm run serverless -- deploy`.

- Make some requests with cURL to get a feel for the sans-authorization app.

- Check out the version that has authorization in place: `git checkout
  authorized`.

- Redeploy with `npm run serverless -- deploy`.

- Make the same requests again to see the authorization logic in action.

[serverless-credentials]: https://github.com/serverless/serverless/blob/d7b6fb748eba364aabeae3862f89b13262751c06/docs/providers/aws/guide/credentials.md

## Usage

You can create, retrieve, update, and delete todos with the following commands:

### Create a todo

```console
$ curl https://<SERVICE_ENDPOINT>/dev/todos -d '{"text":"my first todo!"}'
{"id":"0cf6cec0-247f-11eb-b64e-4df956b5b3e4","creator":{"country":"US","sourceIp":"1.2.3.4","userAgent":"curl/7.64.1"},"text":"my first todo!","checked":false,"createdAt":1605141365298,"updatedAt":1605141365298}
```

### List all todos

```console
$ curl https://<SERVICE_ENDPOINT>/dev/todos
[{"checked":false,"createdAt":1605141365298,"text":"my first todo!","creator":{"sourceIp":"1.2.3.4","country":"US","userAgent":"curl/7.64.1"},"id":"0cf6cec0-247f-11eb-b64e-4df956b5b3e4","updatedAt":1605141365298}]
```

### Get a todo

```console
$ curl https://<SERVICE_ENDPOINT>/dev/todos/0cf6cec0-247f-11eb-b64e-4df956b5b3e4
{"checked":false,"createdAt":1605141365298,"text":"my first todo!","creator":{"sourceIp":"1.2.3.4","country":"US","userAgent":"curl/7.64.1"},"id":"0cf6cec0-247f-11eb-b64e-4df956b5b3e4","updatedAt":1605141365298}
```

### Update a todo

```console
$ curl -XPUT https://<SERVICE_ENDPOINT>/dev/todos/0cf6cec0-247f-11eb-b64e-4df956b5b3e4 -d '{"text":"my first updated todo!"}'
{"checked":false,"createdAt":1605141365298,"text":"my first updated todo!","creator":{"sourceIp":"1.2.3.4","country":"US","userAgent":"curl/7.64.1"},"id":"0cf6cec0-247f-11eb-b64e-4df956b5b3e4","updatedAt":1605141518919}
```

### Delete a todo

```console
$ curl -XDELETE https://<SERVICE_ENDPOINT>/dev/todos/0cf6cec0-247f-11eb-b64e-4df956b5b3e4
{"checked":false,"createdAt":1605141365298,"text":"my first updated todo!","creator":{"sourceIp":"1.2.3.4","country":"US","userAgent":"curl/7.64.1"},"id":"0cf6cec0-247f-11eb-b64e-4df956b5b3e4","updatedAt":1605141518919}
```
