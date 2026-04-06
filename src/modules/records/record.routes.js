import express from "express";

import {
  createRecordController,
  getRecordsController,
  updateRecordController,
  deleteRecordController
} from "./record.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/permission.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createRecordSchema,
  updateRecordSchema
} from "./record.validation.js";

import { PERMISSIONS } from "../../utils/constants.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize([PERMISSIONS.CREATE_RECORD]),
  validate(createRecordSchema),
  createRecordController
);

router.get(
  "/",
  authenticate,
  authorize([PERMISSIONS.VIEW_RECORD]),
  getRecordsController
);

router.patch(
  "/:id",
  authenticate,
  authorize([PERMISSIONS.UPDATE_RECORD]),
  validate(updateRecordSchema),
  updateRecordController
);

router.delete(
  "/:id",
  authenticate,
  authorize([PERMISSIONS.DELETE_RECORD]),
  deleteRecordController
);

export default router;