const User = require("../models/users");

const getUsers = async () => {
    return await User.find(
      {},
      "id first_name last_name email is_admin"
    );
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const updateUser = async (user) => {
    const filter = { _id: user.id };
    const update = { ...user };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
    });
    return updatedUser;
};

module.exports = {
    getUsers,
    getUserById,
    updateUser
}
