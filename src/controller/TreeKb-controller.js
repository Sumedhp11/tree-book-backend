import TreeKb from "../models/TreeKb-model.js";

const getTreeKbByname = async (req, res) => {
  const { treeName } = req.params;
  try {
    const kbtree = await TreeKb.find({
      commonName: { $regex: new RegExp(treeName, "i") },
    });
    if (!kbtree) {
      return res.status(404).json({
        success: false,
        message: "Tree not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: kbtree,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllTreeKb = async (req, res) => {
  try {
    const kbs = await TreeKb.find();
    return res.status(200).json({
      success: true,
      data: kbs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { getTreeKbByname, getAllTreeKb };
