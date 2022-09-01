const getCurrent = async (req, res) => {
  const { email, subscription, name, avatarURL } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        name,
        avatarURL,
      },
    },
  });
};

module.exports = getCurrent;
