import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res, next) => {

  try {

    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User created",
      user
    });

  } catch (error) {
    next(error);
  }

};

export const login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    next(error);
  }

};

export const logout = (req, res) => {

  res.clearCookie("access_token");

  res.json({
    message: "Logged out"
  });

};