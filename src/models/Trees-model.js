import mongoose from "mongoose";

const TreesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    geolocation: { type: String, required: true },
    age: {
      type: Number,
    },
    soil_type: {
      type: String,
    },
    kb_link: {
      type: String,
    },
    tree_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Trees = mongoose.model("Trees", TreesSchema);

export default Trees;
