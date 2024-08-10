import Trees from "../models/Trees-model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";
const addNewTree = async (req, res) => {
  const { name, geolocation, age, soil_type, kb_link } = req.body;

  if (!name || !geolocation || !kb_link || !req.file) {
    return res.status(404).json({
      success: false,
      message: "Necessary Tree data not Provided",
    });
  }

  try {
    const { url } = await uploadFileToCloudinary(req.file);

    const newData = {
      name,
      geolocation,
      age,
      soil_type,
      kb_link,
      tree_image: url,
    };

    const alreadyTree = await Trees.findOne({
      $or: [{ name: name }, { geolocation: geolocation }],
    });

    if (alreadyTree) {
      return res.status(400).json({
        success: false,
        message: `${name} already exists`,
        data: alreadyTree,
      });
    }

    const newTree = await Trees.create(newData);
    return res.status(201).json({
      success: true,
      message: `${name} added successfully`,
      data: newTree,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding tree",
    });
  }
};
const getTreeData = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Tree Name not provided",
      });
    }

    const treeData = await Trees.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });

    if (treeData.length === 0) {
      return res.status(200).json({
        success: true,
        message: `${searchTerm} not found`,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `${searchTerm} fetched successfully`,
      data: treeData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching tree data",
    });
  }
};

export { addNewTree, getTreeData };
