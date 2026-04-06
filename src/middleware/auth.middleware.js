import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {

  try {

    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};