const User = require("../models/User");
const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Lütfen Eksik Alan Bırakmayınız!" });
  }

  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Aynı isimli kullanıcı mevcut!" });
  }

  let hashedPwd;

  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
    hashedPwd = await bcrypt.hash(password, 10);
  } else {
    return res.status(409).json({
      message:
        "Şifre Minimum 8 karakter, 1 adet upperCase, 1 adet lowerCase, 1 adet Sayı İçermek zorundadır.!",
    });
  }

  const userObject = {
    username,
    password: hashedPwd,
    email,
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({
      status: 201,
      message: `${username} isimli kullanıcı başarı ile kayıt oldu!`,
    });
  } else {
    res.status(400).json({ message: "404 Error!" });
  }
};

module.exports = {
  addNewUser,
};
