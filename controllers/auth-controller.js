const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function getUser(req, res) {
  try {
    if (!req.user)
      return res
        .status(401)
        .json({ error: "You must be logged in to see this." });

    const foundUser = await User.findById(req.user._id).select(
      "-password "
    );
    res.status(200).json({
      id: foundUser._id,
      name: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function registerUser(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    const allowedRoles = ["student", "teacher"];
    const role = allowedRoles.includes(req.body.role)
      ? req.body.role
      : "student";

    if (foundUser !== null)
      return res.status(400).json({ error: "This user already exists." });

    let isApproved = false;
    if (role === "teacher") {
      const inviteCode = req.body.inviteCode;
      const validCodes = process.env.TEACHER_INVITE_CODES;
      if (!validCodes.includes(inviteCode)) {
        return res
          .status(403)
          .json({ error: "Invalid invite code for teacher registration" });
      }
      isApproved = true;
    }
    const createdUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role,
      isApproved, //This will trigger the pre-save hook
    });

    await createdUser.save();

    const jwtSecretkey = process.env.JWT_SECRET;
    const payload = {
      _id: createdUser._id,
      role: createdUser.role,
    };
    jwt.sign(
      { data: payload },
      jwtSecretkey,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({
          success: "User created successfully.",
          token,
          user: {
            _id: createdUser._id,
            username: createdUser.username,
            role: createdUser.role,
            isApproved: createdUser.isApproved,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const email = req.body.email.trim().toLowerCase()
    const foundUser = await User.findOne({email});
     
    if (!foundUser)
      return res.status(400).json({ error: "Incorrect email or password" });

    const isPasswordCorrect = await foundUser.checkPassword(req.body.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Incorrect email or password" });
    console.log(isPasswordCorrect)
    if (foundUser.role === "teacher" && !foundUser.isApproved) {
      return res
        .status(403)
        .json({ error: "Your account is awaiting admin approval." });
  
    

    }
        

    const jwtSecretkey = process.env.JWT_SECRET;
    const payload = {
      _id: foundUser._id,
      role: foundUser.role,
    };
    jwt.sign(
      { data: payload },
      jwtSecretkey,
      { expiresIn: "1h" },
      (error, token) => {
        if (error) throw error;
        res
          .status(200)
          .json({ success: "User logged in successfully.", token,
            user:{
              id:foundUser._id,
              username:foundUser.username,
              email:foundUser.email,
              role:foundUser.role,
              isApproved: foundUser.isApproved,
            }
           });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  registerUser,
  loginUser,
};
