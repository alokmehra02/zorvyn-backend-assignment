import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import { ROLE_PERMISSIONS } from "../../utils/constants.js";
import { ApiError } from "../../utils/apiError.js";

export const registerUser = async (data) => {

  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const roleRecord = await prisma.role.findUnique({
    where: { name: role }
  });

  if (!roleRecord) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: roleRecord.id
    },
    include: { role: true }
  });

  return user;
};

export const loginUser = async (email, password) => {

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const permissions = ROLE_PERMISSIONS[user.role.name];

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role.name,
    permissions
  });

  return { token, user };
};