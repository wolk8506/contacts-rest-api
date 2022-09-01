const { Contact } = require("../../models");
const createError = require("http-errors");

const updateContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { owner: _id, _id: contactId },
    req.body,
    {
      new: true,
    }
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

module.exports = updateContact;
