const userModel = require('../models/user.model.js');

// Retrieve and return the user with req.params.user_id from the database.
exports.GetProfile = async (req, res, next) => {
  await userModel.findOne({lastname: req.params.lastname})
    .then((allUsers) => {
      return res.status(200).json(allUsers);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};
