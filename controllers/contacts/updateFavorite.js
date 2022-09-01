const { Contact } = require("../../models");
const createError = require("http-errors");

const updateFavorite = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate(
    { owner: _id, _id: contactId },
    { favorite },
    { new: true }
  );
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
