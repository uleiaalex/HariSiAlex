const groupModel = require('../models/group.model.js');

// Retrieve and return the user with req.params.user_id from the database.
exports.GetOwnedGroups = async (req, res, next) => {
  await groupModel.find({author_id: req.params.author_id})
    .populate('users')
    .populate('author_id')
    .then((allGroups) => {
      return res.status(200).json(allGroups);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
    next();
};

// Retrieve and return the user with req.params.user_id from the database.
exports.GetEnteredGroups = async (req, res, next) => {
  await groupModel.find({users: req.params.user_id})
    .populate('users')
    .populate('author_id')
    .then((allGroups) => {
      return res.status(200).json(allGroups);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
    next();
};
