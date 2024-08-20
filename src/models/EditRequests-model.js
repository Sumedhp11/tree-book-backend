import mongoose from "mongoose";

const EditRequestSchema = new mongoose.Schema(
  {
    request_type: {
      enum: ["tree-edit", "kb-edit"],
      default: "tree-edit",
      type: String,
    },
    original_data: {
      type: Object,
    },
    proposed_data: {
      type: Object,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    proposed_by: String,
  },
  { timestamps: true }
);

const EditRequest = mongoose.model("EditRequest", EditRequestSchema);

export default EditRequest;
