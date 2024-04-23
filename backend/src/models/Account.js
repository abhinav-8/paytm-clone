const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account ;
