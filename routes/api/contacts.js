const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));
router.get("/:contactId", auth, ctrlWrapper(ctrl.getContactById));
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeContact));
router.put(
  "/:contactId",
  auth,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  auth,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
module.exports = router;
