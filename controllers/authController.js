const User = require("../models/User");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: `${username}`,
    }).exec();

    let match;
    if (user) {
      match = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({ message: "Kullanıcı Bulunamadı!" });
    }

    if (!match) return res.status(401).json({ message: "Şifre Hatalı!" });

    if (match) {
      return res.status(201).json({
        status: 201,
        message: `Giriş Yapıldı! ${username}`,
        body: {
          username: username,
        },
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "404 Error!" });
  }
};

module.exports = {
  Login,
};
