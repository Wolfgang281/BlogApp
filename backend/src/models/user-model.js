import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    totalBlogs: {
      type: Number,
      default: 0,
    },
    blogs: [
      {
        blogId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Blog",
        },
        _id: false,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isVerifiedToken: {},
    isVerifiedTokenExpire: {},
  },
  { timestamps: true, versionKey: false },
);

//! password hashing
userSchema.pre("save", async function () {
  //TODO: if check
  let salt = await bcryptjs.genSalt(10);
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
});

//! compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password); //! save or pass password in string
};

const UserModel = model("User", userSchema);

export default UserModel;

/* let user1 = {
  name: "sri",
  email: "s@gmail.com",
  password: "123",
  totalBlogs: 3,
  blogs: [{ blogId: "B123" }, { blogId: "B234" }, { blogId: "B345" }],
};
 */
