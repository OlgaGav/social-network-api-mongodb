const mongoose = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Schema to create User model
const userSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  thoughts: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thoughts'
    }
  ],
  friends: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
   ],
  },
  {
    // transform Objects after querying MongoDb: toJSON
    // indicate that virtuals should be included with response, overriding the default behavior
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
)
// create virtual property 
userSchema
  .virtual('friendsCount')
  .get(function() {
    return this.friends.length;
  })


module.exports = mongoose.model('User', userSchema);
