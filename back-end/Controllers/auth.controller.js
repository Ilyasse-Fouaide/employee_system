const { Auth } = require('../Models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) { return res.status(400).json({ error: "Enter your required fields!!." }); }

    const user = await Auth.findOne({ email });

    if (user) { return res.status(400).json({ error: "Email Already Exists." }); }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await new Auth({
      username,
      email,
      password: hashPassword
    });
    newUser.save();

    // const token = jwt.sign({ userId: newUser._id, email: newUser.email, username: newUser.username, role: newUser.admin }, process.env.JWT_SECRET);

    // res.cookie("token", token, { httpOnly: true }).json({ message: "Register Success!.", token });

    res.status(200).json({ message: "Register Success!." })

  } catch (err) {
    res.status(500).json({ error: "Something Went Wrong!." });
  }
}

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).json({ error: "Enter your required fields!!." }); }

    const user = await Auth.findOne({ email });
    if (!user) { return res.status(400).json({ error: "Wrong Email." }); }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(400).json({ error: "Wrong Password!." });
    }

    const token = jwt.sign({ userId: user._id, email: user.email, username: user.username, role: user.admin }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true }).json({ message: "Login Success!.", token });

  } catch {
    res.status(500).json({ error: "Something Went Wrong!." });
  }
}

exports.profile = async (req, res) => {
  try {

    return res.status(200).json({ userId: req.userId, email: req.email, username: req.username, admin: req.role });

  } catch (error) {
    res.status(500).json("Something went wrong!." + error);
  }
}

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true, expires: new Date(0)
  }).send();
}

exports.edit = async (req, res) => {
  try {

    const user = await Auth.findById(req.userId);

    if (!user) {
      return res.status(400).json({ error: "No User Found!." });
    }

    return res.json({ user });

  } catch (error) {
    res.status(500).json("Something went wrong!." + error);
  }
}

exports.editProfile = async (req, res) => {
  try {

    const { username, email } = req.body;
    // const { id } = req.params;

    const user = await Auth.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "No User Found!." });
    }

    user.username = username;
    user.email = email;

    await user.save()

    const token = jwt.sign({ userId: user._id, email: user.email, username: user.username, role: user.admin }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true }).json({ message: "Updated Success!." });

  } catch (error) {
    res.status(500).json({ error });
  }
}
