class User {
  constructor({ country, sourceIp, userAgent }) {
    this.country = country;
    this.sourceIp = sourceIp;
    this.userAgent = userAgent;
  }

  static fromEvent(event) {
    const { sourceIp, userAgent } = event.requestContext.identity;
    const country =
      event && event.headers && event.headers['CloudFront-Viewer-Country'];
    const user = new User({ country, sourceIp, userAgent });
    console.log(event.httpMethod, event.resource, JSON.stringify(user)); // Log access.
    return user;
  }
}

module.exports.User = User;
