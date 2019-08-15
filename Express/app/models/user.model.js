const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
    lastname: String,
    firstname: String,
	avatar: String,
	borndate:String,
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model('user',UserSchema,'users');
