const User = require('../db/models/user');
const Post = require('../db/models/Post');
const Like = require('../db/models/Like');
const Event = require('../db/models/Event');
const Joined = require('../db/models/Joined')
const addModelsToRequest = (req, res, next) => {
  req.db = {
    User,
    Post,
    Like,
    Event,
    Joined
  };
  next();
};

module.exports = addModelsToRequest;
