function statusCodeToMessage(code) {
  switch (code) {
    case 403:
      return "Can't do that, boss";
    case 404:
      return "Can't seem to find that one";
    case 422:
      return 'Bad value';
    default:
      return 'Something went wrong';
  }
}

module.exports.error = (cb, err) => {
  console.error(err);
  cb(null, {
    statusCode: err.statusCode || 501,
    headers: { 'Content-Type': 'text/plain' },
    body: statusCodeToMessage(err.statusCode),
  });
};

module.exports.success = (cb, body, statusCode) => {
  cb(null, { statusCode: statusCode || 200, body: JSON.stringify(body) });
};
