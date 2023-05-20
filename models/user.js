const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 id:{
    type:String
 },
 
    name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'Other'],
    default: 'Other'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports =mongoose.model('User', userSchema);
