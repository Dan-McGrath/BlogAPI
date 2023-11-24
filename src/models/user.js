import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.findByLogin = async function (login) {
  let user = await this.findone({
    username: login,
  });

  if (!user) {
    user = await this.findone({ email: login });
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;