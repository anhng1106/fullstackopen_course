const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("./config");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, _res, next) => {
  const auth = req.get("authorization");
  req.token =
    auth && auth.toLowerCase().startsWith("bearer ") ? auth.substring(7) : null;
  next();
};

const userExtractor = async (req, res, next) => {
  try {
    if (!req.token) return res.status(401).json({ error: "token missing" });
    const decoded = jwt.verify(req.token, config.SECRET); // throws if bad/expired
    if (!decoded?.id) return res.status(401).json({ error: "token invalid" });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "user not found" });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error?.code === 11000 ||
    (error?.name === "MongoServerError" && error?.code === 11000) ||
    (error?.name === "MongoError" && error?.code === 11000)
  ) {
    return res.status(400).json({ error: "username must be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError")
    return response.status(401).json({ error: "token expired" });

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
