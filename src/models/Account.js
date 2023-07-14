const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  idtoken: String,
  session_state: String,
});

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
