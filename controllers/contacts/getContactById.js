const { Contact } = require("../../models");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.find({ owner: _id, _id: contactId });
  if (result.length === 0) {
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

module.exports = getContactById;
