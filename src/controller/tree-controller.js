import Trees from "../models/Trees-model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";
const addNewTree = async (req, res) => {
  const { name, geolocation, age, added_by } = req.body;

  if (!name || !geolocation || !req.file || !added_by) {
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
      tree_image: url,
      added_by,
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

    let treeData;

    if (searchTerm) {
      treeData = await Trees.find({
        name: { $regex: new RegExp(searchTerm, "i") },
      });
    } else {
      treeData = await Trees.find();
    }

    if (treeData.length === 0) {
      return res.status(200).json({
        success: true,
        message: searchTerm ? `${searchTerm} not found` : "No trees found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: searchTerm
        ? `${searchTerm} fetched successfully`
        : "All trees fetched successfully",
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

const addTreeFromBackend = async (req, res, next) => {
  const generateRandomOffset = () => (Math.random() - 0.5) * 0.005;

  const treesData = [
    // 5 trees from Andheri, Mumbai
    {
      name: "Banyan Tree",
      geolocation: `${19.1213 + generateRandomOffset()},${
        72.8326 + generateRandomOffset()
      }`,
      age: 50,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree1",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/Banyan_tree_in_Jharkhand.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Mango Tree",
      geolocation: `${19.1213 + generateRandomOffset()},${
        72.8326 + generateRandomOffset()
      }`,
      age: 20,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree2",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Mango_tree_india.JPG",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Neem Tree",
      geolocation: `${19.1213 + generateRandomOffset()},${
        72.8326 + generateRandomOffset()
      }`,
      age: 15,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree3",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3b/Neem_tree.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Pine Tree",
      geolocation: `${19.1213 + generateRandomOffset()},${
        72.8326 + generateRandomOffset()
      }`,
      age: 30,
      soil_type: "Clay",
      kb_link: "https://example.com/tree4",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Pinus_nigra_-_Vikipedija.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Peepal Tree",
      geolocation: `${19.1213 + generateRandomOffset()},${
        72.8326 + generateRandomOffset()
      }`,
      age: 40,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree5",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ficus_religiosa_Bodhi_tree.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },

    // 5 trees from Goregaon, Mumbai
    {
      name: "Jackfruit Tree",
      geolocation: `${19.1738 + generateRandomOffset()},${
        72.8347 + generateRandomOffset()
      }`,
      age: 25,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree6",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Jackfruit_in_Myanmar.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Banana Tree",
      geolocation: `${19.1738 + generateRandomOffset()},${
        72.8347 + generateRandomOffset()
      }`,
      age: 10,
      soil_type: "Clay",
      kb_link: "https://example.com/tree7",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Banana_plant_in_Uganda.JPG",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Coconut Tree",
      geolocation: `${19.1738 + generateRandomOffset()},${
        72.8347 + generateRandomOffset()
      }`,
      age: 12,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree8",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coconut_palms_in_Eluari_village.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Bamboo Tree",
      geolocation: `${19.1738 + generateRandomOffset()},${
        72.8347 + generateRandomOffset()
      }`,
      age: 8,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree9",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Bamboo_Forest%2C_Siem_Reap.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Papaya Tree",
      geolocation: `${19.1738 + generateRandomOffset()},${
        72.8347 + generateRandomOffset()
      }`,
      age: 5,
      soil_type: "Clay",
      kb_link: "https://example.com/tree10",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Papaya_tree.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },

    // 5 trees from Churchgate, Mumbai
    {
      name: "Ashoka Tree",
      geolocation: `${18.9308 + generateRandomOffset()},${
        72.8258 + generateRandomOffset()
      }`,
      age: 60,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree11",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Polyalthia_longifolia.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Banyan Tree",
      geolocation: `${18.9308 + generateRandomOffset()},${
        72.8258 + generateRandomOffset()
      }`,
      age: 55,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree12",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/Banyan_tree_in_Jharkhand.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Mango Tree",
      geolocation: `${18.9308 + generateRandomOffset()},${
        72.8258 + generateRandomOffset()
      }`,
      age: 45,
      soil_type: "Clay",
      kb_link: "https://example.com/tree13",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Mango_tree_india.JPG",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Peepal Tree",
      geolocation: `${18.9308 + generateRandomOffset()},${
        72.8258 + generateRandomOffset()
      }`,
      age: 70,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree14",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ficus_religiosa_Bodhi_tree.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Neem Tree",
      geolocation: `${18.9308 + generateRandomOffset()},${
        72.8258 + generateRandomOffset()
      }`,
      age: 30,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree15",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3b/Neem_tree.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },

    // 5 trees from Malad, Mumbai
    {
      name: "Papaya Tree",
      geolocation: `${19.1974 + generateRandomOffset()},${
        72.8328 + generateRandomOffset()
      }`,
      age: 15,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree16",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Papaya_tree.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Banana Tree",
      geolocation: `${19.1974 + generateRandomOffset()},${
        72.8328 + generateRandomOffset()
      }`,
      age: 12,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree17",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/Banana_plant_in_Uganda.JPG",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Coconut Tree",
      geolocation: `${19.1974 + generateRandomOffset()},${
        72.8328 + generateRandomOffset()
      }`,
      age: 20,
      soil_type: "Clay",
      kb_link: "https://example.com/tree18",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coconut_palms_in_Eluari_village.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Jackfruit Tree",
      geolocation: `${19.1974 + generateRandomOffset()},${
        72.8328 + generateRandomOffset()
      }`,
      age: 35,
      soil_type: "Loamy",
      kb_link: "https://example.com/tree19",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Jackfruit_in_Myanmar.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
    {
      name: "Bamboo Tree",
      geolocation: `${19.1974 + generateRandomOffset()},${
        72.8328 + generateRandomOffset()
      }`,
      age: 5,
      soil_type: "Sandy",
      kb_link: "https://example.com/tree20",
      tree_image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6d/Bamboo_Forest%2C_Siem_Reap.jpg",
      added_by: "sumedhpawar8966@gmail.com",
    },
  ];
  try {
    const result = await Trees.insertMany(treesData);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addNewTree, getTreeData, addTreeFromBackend };
