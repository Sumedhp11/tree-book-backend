import mongoose from "mongoose";
const adminuserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

const AdminUser = mongoose.model("AdminUser", adminuserSchema);

export default AdminUser;
