const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/user
router.route("/").get(getUsers).post(createUser);

// /api/user/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friend/:friendId
router.route("/:userId/friend/:friendId").post(addFriend).put(deleteFriend);

module.exports = router;
