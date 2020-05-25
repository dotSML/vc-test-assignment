const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    if (req.userId !== req.body.userId) {
      const error = new Error("Token and received userId do not match!");
      throw error;
    }
    const userId = req.body.userId;
    if (!userId) {
      const error = new Error("No userId provided!");
      throw error;
    }

    const user = await User.findAll({ where: { id: userId } });
    if (!user.length) {
      const error = new Error("No user found!");
      throw error;
    }

    res.status(200).json({ user: user[0] });
  } catch (err) {
    next(err);
  }
};
