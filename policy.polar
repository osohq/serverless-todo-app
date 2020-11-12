allow(_: User, "list", _);

allow(_: User, "create", _);

allow(user: User, "view", todo) if
    user.country = todo.creator.country;

allow(user: User, "update", todo) if
    user.sourceIp = todo.creator.sourceIp
    and user.userAgent = todo.creator.userAgent;

allow(user: User, "delete", todo) if
    allow(user, "update", todo)
    and ((new Date().getTime() - todo.createdAt) / (60 * 1000)) < 5;
