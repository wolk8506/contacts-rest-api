const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const gravatar = require("gravatar");
const shortid = require("shortid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = shortid();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    name,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="https://contact-rest-api.herokuapp.com/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  const { subscription, token } = result;
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        email,
        subscription,
        name,
      },
    },
  });
};

module.exports = register;
