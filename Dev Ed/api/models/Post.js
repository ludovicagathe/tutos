const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    default: "",
    type: String
  },
  data: String,
  status: {
    type: String,
    default: "new",
  },
  active: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: "general"
  },
  date: {
    type:String,
    default: new Date().toISOString()
  }
});

module.exports = mongoose.model('Post', PostSchema);
