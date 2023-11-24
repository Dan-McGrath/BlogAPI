import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    email: { type: String, unique: true, required: true },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.virtual("full_name").get(function () {
    return `${this.first_name} ${this.last_name}`;
  });

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
