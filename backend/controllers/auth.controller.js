import User from "../models/user.model.js";
import tokenGeneration from "../utils/SecretToken.js";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: "Signup successfully",
    });
  } catch (error) {
    console.log(error, "Failed to signup");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const IsMatch = await existingUser.comparePassword(password);
    if (!IsMatch) {
      return res.status(401).json({ message: "incorrect credentials" });
    }
    const token = tokenGeneration({ email: email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      role: existingUser.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Set to true only if using HTTPS
      expires: new Date(0), // This will immediately expire the cookie
    });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};

export { signUp, login, logout };
