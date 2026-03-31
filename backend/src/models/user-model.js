import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";
import crypto from "node:crypto";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
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
    isVerifiedToken: {
      type: String,
    }, //? this will save the hashed token
    isVerifiedTokenExpire: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

//! password hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  let salt = await bcryptjs.genSalt(10);
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
});

//! compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password); //! save or pass password in string
};

//! generate email verification token
userSchema.methods.generateVerificationToken = async function () {
  //! 1) generate a raw-token
  let rawToken = crypto.randomBytes(32).toString("hex"); //? size in bytes
  //! 2) hash the token and save in db
  let hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  //! 3) save in db-
  this.isVerifiedToken = hashedToken;
  this.isVerifiedTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hrs

  await this.save(); // all the updated details will be saved in db. this is pointing to current object
  //! 4) return rawToken
  return rawToken;
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
