import mongoose from "mongoose";

const treeKBSchema = new mongoose.Schema({
  tree_image: {
    type: String,
    default: null,
  },

  uses: {
    type: [String],
    default: [],
  },

  availability: {
    type: String,
    default: null,
  },

  survivalConditions: {
    type: [String],
    default: [],
  },

  physicalCharacteristics: {
    type: [String],
    default: [],
  },

  family: {
    type: String,
    default: null,
  },

  commonName: {
    type: String,
    default: null,
  },

  scientificName: {
    type: String,
    default: null,
  },
});

const TreeKb = mongoose.model("Tree-KB", treeKBSchema);
export default TreeKb;
