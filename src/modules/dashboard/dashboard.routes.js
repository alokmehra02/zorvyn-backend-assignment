import express from "express";

import {
  summaryController,
  categoryTotalsController,
  monthlyTrendsController,
  recentActivityController
} from "./dashboard.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/permission.middleware.js";
import { PERMISSIONS } from "../../utils/constants.js";

const router = express.Router();

router.get(
  "/summary",
  authenticate,
  authorize([PERMISSIONS.VIEW_SUMMARY]),
  summaryController
);

router.get(
  "/category-totals",
  authenticate,
  authorize([PERMISSIONS.VIEW_SUMMARY]),
  categoryTotalsController
);

router.get(
  "/monthly-trends",
  authenticate,
  authorize([PERMISSIONS.VIEW_SUMMARY]),
  monthlyTrendsController
);

router.get(
  "/recent-activity",
  authenticate,
  authorize([PERMISSIONS.VIEW_SUMMARY]),
  recentActivityController
);

export default router;