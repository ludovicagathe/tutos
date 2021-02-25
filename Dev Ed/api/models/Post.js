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
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
