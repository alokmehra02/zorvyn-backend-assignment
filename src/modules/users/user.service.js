import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { ApiError } from "../../utils/apiError.js";

export const createUser = async (data) => {

  const { name, email, password, role } = data;

  const existing = await prisma.user.findUnique({
    where: { email }
  });

  if (existing) {
    throw new ApiError(400, "User already exists");
  }

  const roleRecord = await prisma.role.findUnique({
    where: { name: role }
  });

  if (!roleRecord) {
    throw new ApiError(400, "Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: roleRecord.id
    },
    include: {
      role: true
    }
  });

  delete user.password;

  return user;
};

export const getUsers = async () => {

  return prisma.user.findMany({
    include: {
      role: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

};

export const getUserById = async (id) => {

  return prisma.user.findUnique({
    where: { id: Number(id) },
    include: { role: true }
  });

};

export const updateUser = async (id, data) => {

  let updateData = { ...data };

  if (data.role) {

    const roleRecord = await prisma.role.findUnique({
      where: { name: data.role }
    });

    updateData.roleId = roleRecord.id;

    delete updateData.role;
  }

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
    include: { role: true }
  });

  return user;
};

export const deleteUser = async (id) => {

  await prisma.user.delete({
    where: { id: Number(id) }
  });

  return true;

};