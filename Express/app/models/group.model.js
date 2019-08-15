const mongoose = require('mongoose');

const user = require('../models/user.model.js');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
    name: String,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
	users: [{
        type:Schema.Types.ObjectId,
        ref: 'user'
    }],
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model('group',UserSchema,'groups');
