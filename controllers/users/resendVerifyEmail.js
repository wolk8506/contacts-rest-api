const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const { verify, verificationToken } = user;

  if (!user) {
    throw NotFound();
  } else if (verify) {
    throw BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="https://contact-rest-api.herokuapp.com/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
