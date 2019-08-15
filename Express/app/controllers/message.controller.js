const messageModel = require('../models/message.model.js');

// Retrieve and return the user with req.params.user_id from the database.
exports.GetMessages = async (req, res, next) => {
  await messageModel.findOne({channel: req.params.channel_id},['messages'])
     .then((allMessages) => {
        return res.status(200).json(allMessages);
	 }
	)
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};
