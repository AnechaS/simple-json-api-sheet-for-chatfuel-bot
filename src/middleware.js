const { omitWithNull } = require("./utils");

exports.reqOmitWithNull = function (req, res, next) {
  req.body = omitWithNull(req.body);
  req.query = omitWithNull(req.query);

  next();
};
