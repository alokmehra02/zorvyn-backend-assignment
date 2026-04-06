import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "./user.service.js";

export const createUserController = async (req, res, next) => {

  try {

    const user = await createUser(req.body);

    res.status(201).json({
      message: "User created",
      user
    });

  } catch (error) {
    next(error);
  }

};

export const getUsersController = async (req, res, next) => {

  try {

    const users = await getUsers();

    res.json(users);

  } catch (error) {
    next(error);
  }

};

export const getUserController = async (req, res, next) => {

  try {

    const user = await getUserById(req.params.id);

    res.json(user);

  } catch (error) {
    next(error);
  }

};

export const updateUserController = async (req, res, next) => {

  try {

    const user = await updateUser(req.params.id, req.body);

    res.json({
      message: "User updated",
      user
    });

  } catch (error) {
    next(error);
  }

};

export const deleteUserController = async (req, res, next) => {

  try {

    await deleteUser(req.params.id);

    res.json({
      message: "User deleted"
    });

  } catch (error) {
    next(error);
  }

};