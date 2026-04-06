import prisma from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export const createRecord = async (data, userId) => {

  const record = await prisma.financialRecord.create({
    data: {
      amount: data.amount,
      type: data.type,
      categoryId: data.categoryId,
      date: new Date(data.date),
      notes: data.notes,
      createdBy: userId
    }
  });

  return record;

};

export const getRecords = async (filters) => {

  const { type, categoryId, startDate, endDate, page = 1, limit = 10 } = filters;

  const where = {};

  if (type) where.type = type;

  if (categoryId) where.categoryId = Number(categoryId);

  if (startDate || endDate) {
    where.date = {};

    if (startDate) where.date.gte = new Date(startDate);
    if (endDate) where.date.lte = new Date(endDate);
  }

  const records = await prisma.financialRecord.findMany({
    where,
    include: {
      category: true,
      user: {
        select: { id: true, name: true }
      }
    },
    skip: (page - 1) * limit,
    take: Number(limit),
    orderBy: { date: "desc" }
  });

  return records;

};

export const updateRecord = async (id, data) => {

  const record = await prisma.financialRecord.update({
    where: { id: Number(id) },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined
    }
  });

  return record;

};

export const deleteRecord = async (id) => {

  await prisma.financialRecord.delete({
    where: { id: Number(id) }
  });

  return true;

};