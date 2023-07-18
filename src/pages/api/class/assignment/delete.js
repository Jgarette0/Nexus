import Class from "../../../../../models/Class";
import Assignment from "../../../../../models/Assignment";
import manageResponses from "../../../../../utils/responses/manageResponses";
import { authOptions } from "../../auth/[...nextauth]";
import mongoose from "mongoose";

const { getServerSession } = require("next-auth");

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(400).json({
      status: 400,
      message: "Bad Request!",
    });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (
      !session ||
      !session.user ||
      (!session.user.email && !session.user._id)
    ) {
      const error = new Error("Sign in required!");
      error.statusCode = 401;
      throw error;
    }

    const { user } = session;
    const { deleteAssignmentId: assignmentId, classId } = req.query;

    var ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(assignmentId) || !ObjectId.isValid(classId)) {
      const error = new Error("Invalid Id!");
      error.statusCode = 422;
      throw error;
    }

    const userClass = await Class.findById(classId).populate("teacher");

    if (!userClass) {
      const error = new Error("Class not found!");
      error.statusCode = 404;
      throw error;
    }

    if (user._id) {
      if (userClass.teacher._id.toString() !== user._id) {
        const error = new Error("Not authorized!");
        error.statusCode = 401;
        throw error;
      }
    } else {
      if (userClass.teacher.credentials.email !== user.email) {
        const error = new Error("Not authorized!");
        error.statusCode = 401;
        throw error;
      }
    }

    const delRes = await Assignment.deleteOne({
      _id: assignmentId,
    });

    if (!delRes.deletedCount) {
      const error = new Error("Assignment not found!");
      error.statusCode = 404;
      throw error;
    }

    await Class.updateOne(
      { _id: classId },
      { $pull: { assignments: assignmentId } },
      { multi: true }
    );

    return res.status(200).json({
      _id: assignmentId,
      message: "Assignment deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    return res
      .status(error.statusCode)
      .json(manageResponses(error.statusCode, error.message));
  }
};

export default handler;
