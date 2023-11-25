const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tourists = require("../models/touristModel");

const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourists.find();
    return res.status(200).json({
      message: "Successfully from controller",
      count: tourists.length,
      tourists,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const touristSignUp = async (req, res) => {
  try {
    const { name, email, password, tourLocation, location } = req.body;

    const alreadyExisting = await Tourists.findOne({ email });

    if (alreadyExisting) {
      return res
        .status(400)
        .json({ message: "This user account already exixt!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // GEnerate random characters
    function generateRandomCharacters(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    // END: GENERATE
    const passkey = generateRandomCharacters(6);

    const newTourist = new Tourists({
      name,
      email,
      password: hashedPassword,
      tourLocation,
      location,
      passkey,
    });

    await newTourist.save();

    return res.status(200).json({
      mesasge: "Registration successful",
      student: newTourist,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const touristLogin = async (req, res) => {
  try {
    const { passkey } = req.body;

    const alreadyExisiting = await Tourists.findOne({ passkey });

    if (!alreadyExisiting) {
      return res.status(404).json({ message: "This user does not exist!" });
    }

    const payload = {
      id: alreadyExisiting._id,
      passkey,
    };

    const activeToken = await jwt.sign(payload, process.env.TOKEN, {
      expiresIn: "5h",
    });
    const accessToken = await jwt.sign(payload, process.env.TOKEN, {
      expiresIn: "3m",
    });
    const refreshToken = await jwt.sign(payload, process.env.TOKEN, {
      expiresIn: "3d",
    });

    alreadyExisiting.refreshToken = refreshToken;

    await alreadyExisiting.save();

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: alreadyExisiting,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllTourists,
  touristSignUp,
  touristLogin,
};
