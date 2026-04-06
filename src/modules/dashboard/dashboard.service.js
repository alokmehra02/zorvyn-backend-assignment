import prisma from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";

export const getSummary = async () => {

  const income = await prisma.financialRecord.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" }
  });

  const expense = await prisma.financialRecord.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" }
  });

  const totalIncome = income._sum.amount || 0;
  const totalExpense = expense._sum.amount || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };

};


export const getCategoryTotals = async () => {

  const results = await prisma.financialRecord.groupBy({
    by: ["categoryId"],
    _sum: { amount: true }
  });

  const categories = await prisma.category.findMany();

  return results.map((r) => {
    const category = categories.find(c => c.id === r.categoryId);

    return {
      category: category?.name || "Unknown",
      total: r._sum.amount
    };
  });

};


export const getMonthlyTrends = async () => {

  const records = await prisma.financialRecord.findMany({
    select: {
      amount: true,
      type: true,
      date: true
    }
  });

  const monthly = {};

  records.forEach(record => {

    const month = record.date.toISOString().slice(0, 7);

    if (!monthly[month]) {
      monthly[month] = {
        income: 0,
        expense: 0
      };
    }

    if (record.type === "INCOME") {
      monthly[month].income += record.amount;
    } else {
      monthly[month].expense += record.amount;
    }

  });

  return monthly;

};


export const getRecentActivity = async () => {

  return prisma.financialRecord.findMany({
    take: 5,
    orderBy: { date: "desc" },
    include: {
      category: true,
      user: {
        select: { name: true }
      }
    }
  });

};