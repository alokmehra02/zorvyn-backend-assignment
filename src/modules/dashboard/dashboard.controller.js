import {
  getSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentActivity
} from "./dashboard.service.js";

export const summaryController = async (req, res, next) => {

  try {

    const summary = await getSummary();

    res.json(summary);

  } catch (error) {
    next(error);
  }

};


export const categoryTotalsController = async (req, res, next) => {

  try {

    const data = await getCategoryTotals();

    res.json(data);

  } catch (error) {
    next(error);
  }

};


export const monthlyTrendsController = async (req, res, next) => {

  try {

    const trends = await getMonthlyTrends();

    res.json(trends);

  } catch (error) {
    next(error);
  }

};


export const recentActivityController = async (req, res, next) => {

  try {

    const records = await getRecentActivity();

    res.json(records);

  } catch (error) {
    next(error);
  }

};