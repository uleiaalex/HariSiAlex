const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const Message = new Schema({
	created: String,
    from: String,
	text: String,
});

const MessageSchema = new Schema({
	_id: Schema.Types.ObjectId,
    channel:String,
	messages:[Message],
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model('conversation',MessageSchema,'conversations');
