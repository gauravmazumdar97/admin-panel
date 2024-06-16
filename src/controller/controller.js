const User = require("../models/userModel");
const Message = require("../models/messageModel");
const Participants = require("../models/participantsModel");
const chatModel = require("../models/chatModel");
const AWSConfig = require("../config/awsConfig");
const AuthToken = require("../config/jwt-Token");
const Customer = require("../models/customer");
const Product = require("../models/products");
const Purchase = require("../models/purchases");

class Controller {
  constructor() {}

  //   CUSTOMER APIS

  async getCustomer(req, res) {
    try {
      const purchase = [];  
      const { _id } = req.body;

      if (_id) {
        let data = await Customer.findById(_id)
        .populate({
            path: 'purchases',
            populate: { path: 'productId', select: '_id name brand price star' }
        })
        .exec();


        return res.status(200).json(data);
      } else {
        const data = await Customer.find(_id).populate("purchases").exec();

        return res.status(200).json(data);
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async addCustomer(req, res) {
    try {
      const { name, email, state, pincode, productId } = req.body;
      const data = await Customer.create({
        name,
        email,
        state,
        pincode,
        productId,
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async updateCustomer(req, res) {
    try {
      const { _id, state } = req.body;
      const result = await Customer.find({ _id: { $eq: { _id } } }).updateOne({
        state: state,
      });

      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async deleteCustomer(req, res) {
    try {
      const { customerId } = req.body;
      const result = await Customer.deleteOne({ _id: customerId });

      return res.status(200).json({ result });
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  //   PRODUCT APIS
  async getCustomerProducts(req, res) {
    try {
      let data;
      const { _id } = req.body;

      req.body._id == null
        ? (data = await Product.find().select("-__v"))
        : (data = await Product.find({ _id: { $eq: { _id } } }).select("-__v"));

      return res.status(200).json({ msg: "Data fetched", data });
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async addCustomerProducts(req, res) {
    try {
      const { name, brand, price, star } = req.body;
      // Check if the product already exists
      const existingProduct = await Product.findOne({
        name: name,
        brand: brand,
        price: price,
        star: star,
      });

      if (existingProduct == null) {
        const data = await Product.create({ name, brand, price, star });

        return res.status(200).json({ msg: "Product ADDED", data });
      } else {
        return res.status(200).json({ msg: `Product already exists` });
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async updateCustomerProducts(req, res) {
    try {
      const { _id, name, brand, price, star } = req.body;

      // Check if the product already exists
      const existingProduct = await Product.find({
        _id: { $eq: { _id } },
      }).updateOne({
        name: name,
        brand: brand,
        price: price,
        star: star,
      });

      if (existingProduct == null) {
        return res.status(200).json({ msg: `Product does not exists` });
      } else {
        const data = await Product.find({ _id: { $eq: { _id } } }).updateOne({
          name: name,
          brand: brand,
          price: price,
          star: star,
        });
        return res.status(200).json({ msg: "Product UPDATE", data });
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async deleteCustomerProducts(req, res) {
    try {
      const { _id } = req.body;

      // Check if the product already exists
      const existingProduct = await Product.find({ _id: { $eq: { _id } } });

      if (existingProduct == null) {
        return res.status(200).json({ msg: `Product does not exists` });
      } else {
        const data = await Product.deleteOne({ _id: { $eq: { _id } } });

        return res.status(200).json({ msg: "Product DELETED", data });
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  //   PURCHASES APIS
  async getPurchases(req, res) {
    try {
      let data;
      const { _id } = req.body;

      req.body._id == null
        ? (data = await Purchase.find().select("-__v"))
        : (data = await Purchase.find({ _id: { $eq: { _id } } }).select("-__v"));

      return res.status(200).json({ msg: "Data fetched", data });
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async addPurchases(req, res) {
    try {
      const { customerId, quantity, productId, total, status } = req.body;
      // Check if the product already exists
      const existingProduct = await Purchase.findOne({
        customerId: customerId,
        quantity: quantity,
        productId: productId,
        total: total,
        status: status,
      });

      if (existingProduct == null) {
        const data = await Purchase.create({
          customerId,
          quantity,
          productId,
          total,
          status,
        });

        return res.status(200).json({ msg: "Purchase ADDED", data });
      } else {
        return res.status(200).json({ msg: `Purchase ALREADY EXIST` });
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async updatePurchases(req, res) {
    try {
      const { _id, name, brand, price, star } = req.body;

      // Check if the product already exists
      const existingProduct = await Product.find({
        _id: { $eq: { _id } },
      }).updateOne({
        name: name,
        brand: brand,
        price: price,
        star: star,
      });

      if (existingProduct == null) {
        return res.status(200).json({ msg: `Product does not exists` });
      } else {
        const data = await Product.find({ _id: { $eq: { _id } } }).updateOne({
          name: name,
          brand: brand,
          price: price,
          star: star,
        });
        return res.status(200).json({ msg: "Product UPDATE", data });
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  async deletePurchases(req, res) {
    try {
      const { _id } = req.body;

      // Check if the product already exists
      const existingProduct = await Product.find({ _id: { $eq: { _id } } });

      if (existingProduct == null) {
        return res.status(200).json({ msg: `Product does not exists` });
      } else {
        const data = await Product.deleteOne({ _id: { $eq: { _id } } });

        return res.status(200).json({ msg: "Product DELETED", data });
      }
    } catch (error) {
      return res.status(400).json({ msg: `Something Went Wrong ${error}` });
    }
  }

  /**
   * Register a new user
   * @param {Object} req - The request object containing the user's details.
   * @param {Object} res - The response object to send the response.
   */
  registerUser = async (req, res) => {
    try {
      const { name, email, password, pic } = req.body;

      // Validate that all required fields are provided
      if (!name || !email || !password || !pic) {
        return res.status(400).json({ message: "Please enter all the fields" });
      }

      // Check if the user already exists
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      const user = await User.create({ name, email, password, pic });

      // If user creation is successful, return the user details
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          pic: user.pic,
          isActive: 1,
          isDeleted: 1,
        });
      } else {
        return res.status(400).json({ message: "Failed to create user" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  /**
   * Login a user
   * @param {Object} req - The request object containing the user's email and password.
   * @param {Object} res - The response object to send the response.
   */
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate that both email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all the fields" });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // If user is found, generate tokens and return the user and tokens
      if (user) {
        const tokens = await AuthToken.generateToken(user._id);
        return res.status(200).json({ user, tokens });
      } else {
        return res.status(401).json({ INVALID_USER: "Please register" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  /**
   * Generate pre-signed URL for file upload
   * @param {Object} req - The request object containing the user's ID, folder name, and file name.
   * @param {Object} res - The response object to send the response.
   */
  preSignedUrl = async (req, res) => {
    try {
      const { email, folderName, fileName } = req.body;

      // Validate that both folder name and file name are provided
      if (!folderName || !fileName) {
        return res.status(400).json({ message: "Please enter all the fields" });
      }

      // Find the user by user ID
      const user = await User.findOne({ email });

      // If user is found, generate a pre-signed URL and return it
      if (user) {
        const signedUrl = await AWSConfig.generatePresignedUrl(
          folderName,
          fileName
        );
        return res.status(200).json({ signedUrl });
      } else {
        return res
          .status(401)
          .json({ USER_EXISTS: "User doesn't exists please login" });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  searchUser = async (req, res) => {
    try {
      console.log(req.user);

      const allUsers = await User.find({ _id: { $ne: req.user._id } });

      return res.status(200).json({ allUsers });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  accessChat = async (req, res) => {
    try {
      // const allUsers = await User.find({_id:{$eq:req.user._id}})

      // if(!allUsers){
      //     return res.status(400).json({ msg:'User not found' });
      // }

      const response = await Participants.create({
        sender: "6664abb19025795d3b88eb45",
        reciever: "6664abb19025795d3b88eb45",
        message: "Hy how are you?",
      });

      return res.status(200).json({ response });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };

  createGroupAt = async (req, res) => {
    try {
      console.log(req.user);

      const allUsers = await User.find({ _id: { $ne: req.user._id } });

      return res.status(200).json({ allUsers });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  renameGroup = async (req, res) => {
    try {
      console.log(req.user);

      const allUsers = await User.find({ _id: { $ne: req.user._id } });

      return res.status(200).json({ allUsers });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  removeFromGroup = async (req, res) => {
    try {
      console.log(req.user);

      const allUsers = await User.find({ _id: { $ne: req.user._id } });

      return res.status(200).json({ allUsers });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  addToGroup = async (req, res) => {
    try {
      console.log(req.user);

      const allUsers = await User.find({ _id: { $ne: req.user._id } });

      return res.status(200).json({ allUsers });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

module.exports = new Controller();
