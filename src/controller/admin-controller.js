import AdminUser from "../models/admin-model.js";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import Trees from "../models/Trees-model.js";
import EditRequest from "../models/EditRequests-model.js";
import { sendToken } from "../utils/cookies.js";
import TreeKb from "../models/TreeKb-model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";
configDotenv();
const AdminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminUser({
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const refreshToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    admin.refreshToken = refreshToken;
    await admin.save();

    sendToken(res, admin, 200, "Welcome Admin", refreshToken);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decodedRefresh) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired refresh token",
        });
      }

      const newAccessToken = jwt.sign(
        { id: decodedRefresh.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "Access token refreshed",
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllTrees = async (req, res) => {
  try {
    const trees = await Trees.find();
    return res.status(200).json({
      success: true,
      trees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateTree = async (req, res) => {
  try {
    const { treeId } = req.params;
    const { name, age, soil_type } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (age) updateData.age = age;
    if (soil_type) updateData.soil_type = soil_type;

    const updatedTree = await Trees.findByIdAndUpdate(treeId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTree) {
      return res.status(404).json({
        success: false,
        message: "Tree not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tree updated successfully",
      data: updatedTree,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllEditRequests = async (req, res) => {
  try {
    const editRequests = await EditRequest.find();
    return res.status(200).json({
      success: true,
      editRequests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const ChangeEditRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const editrequest = await EditRequest.findById(id);
    if (!editrequest) {
      return res.status(404).json({
        success: false,
        message: "Edit request not found",
      });
    }

    editrequest.status = status;
    await editrequest.save();

    if (status === "approved" && editrequest.request_type === "tree-edit") {
      const { original_data, proposed_data } = editrequest;

      const tree = await Trees.findById(original_data._id);
      if (!tree) {
        return res.status(404).json({
          success: false,
          message: "Tree not found",
        });
      }

      Object.assign(tree, proposed_data);
      await tree.save();
    }

    return res.status(200).json({
      success: true,
      message: "Edit request status updated successfully",
      data: editrequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("refresh-token", {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addTreeKb = async (req, res) => {
  try {
    const {
      uses,
      availability,
      survivalConditions,
      physicalCharacteristics,
      family,
      commonName,
      scientificName,
    } = req.body;
    const { url } = await uploadFileToCloudinary(req.file);
    const newTree = new TreeKb({
      tree_image: url,
      uses,
      availability,
      survivalConditions,
      physicalCharacteristics,
      family,
      commonName,
      scientificName,
    });

    const savedTree = await newTree.save();

    res.status(201).json({
      message: "Tree knowledge added successfully!",
      data: savedTree,
    });
  } catch (error) {
    console.error("Error adding tree knowledge:", error);
    res.status(500).json({
      message: "An error occurred while adding tree knowledge.",
      error: error.message,
    });
  }
};

export {
  Adminlogin,
  AdminRegister,
  refreshAccessToken,
  getAllTrees,
  updateTree,
  logoutAdmin,
  getAllEditRequests,
  ChangeEditRequestStatus,
  addTreeKb,
  
};
