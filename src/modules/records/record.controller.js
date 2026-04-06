import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from "./record.service.js";

export const createRecordController = async (req, res, next) => {

  try {

    const record = await createRecord(req.body, req.user.userId);

    res.status(201).json({
      message: "Record created",
      record
    });

  } catch (error) {
    next(error);
  }

};

export const getRecordsController = async (req, res, next) => {

  try {

    const records = await getRecords(req.query);

    res.json(records);

  } catch (error) {
    next(error);
  }

};

export const updateRecordController = async (req, res, next) => {

  try {

    const record = await updateRecord(req.params.id, req.body);

    res.json({
      message: "Record updated",
      record
    });

  } catch (error) {
    next(error);
  }

};

export const deleteRecordController = async (req, res, next) => {

  try {

    await deleteRecord(req.params.id);

    res.json({
      message: "Record deleted"
    });

  } catch (error) {
    next(error);
  }

};