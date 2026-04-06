import express from "express";

import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController
} from "./user.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/permission.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createUserSchema,
  updateUserSchema
} from "./user.validation.js";

import { PERMISSIONS } from "../../utils/constants.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize([PERMISSIONS.MANAGE_USERS]),
  validate(createUserSchema),
  createUserController
);

router.get(
  "/",
  authenticate,
  authorize([PERMISSIONS.MANAGE_USERS]),
  getUsersController
);

router.get(
  "/:id",
  authenticate,
  authorize([PERMISSIONS.MANAGE_USERS]),
  getUserController
);

router.patch(
  "/:id",
  authenticate,
  authorize([PERMISSIONS.MANAGE_USERS]),
  validate(updateUserSchema),
  updateUserController
);

router.delete(
  "/:id",
  authenticate,
  authorize([PERMISSIONS.MANAGE_USERS]),
  deleteUserController
);

export default router;