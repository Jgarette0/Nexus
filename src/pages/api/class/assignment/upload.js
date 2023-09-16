import Assignment from "../../../../../models/Assignment";
import Class from "../../../../../models/Class";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import manageResponses from "../../../../../utils/responses/manageResponses";
import db from "../../../../../utils/db";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import User from "../../../../../models/User";
const cloudinary = require("cloudinary").v2;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};

const checkAuthorization = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || (!session.user.email && !session.user._id)) {
    return null;
  }

  return session;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const authObj = await checkAuthorization(req, res);
    if (!authObj) {
      const error = new Error("Sign in required!");
      error.statusCode = 401;
      throw error;
    }

    let uploadPath;
    try {
      const { user } = authObj;

      let filter = { _id: user._id };

      if (!user._id) {
        filter = { "credentials.email": user.email };
      }

      const form = formidable({ keepExtensions: true });
      const [fields, files] = await form.parse(req);

      const { assignmentId: assignmentIdArr, comment: commentArr } = fields;
      const { file } = files;
      const assignmentId = assignmentIdArr[0];
      const userComment = commentArr[0];

      if (!file || !file[0]) {
        const error = new Error("No submission found!");
        error.statusCode = 422;
        throw error;
      }

      let ObjectId = mongoose.Types.ObjectId;

      if (!ObjectId.isValid(assignmentId)) {
        const error = new Error("Invalid Assignment Id!");
        error.statusCode = 422;
        throw error;
      }

      await db.connect();

      const classAssignment = await Assignment.findById(assignmentId);

      if (!classAssignment) {
        const error = new Error("Assignment do not exists!");
        error.statusCode = 404;
        throw error;
      }

      const classUser = await User.findOne(filter);
      cloudinary.config(cloudinaryConfig);

      uploadPath = `/assignments/${classAssignment.cloudinaryId}/submissions/${classUser._id}`;

      await cloudinary.api.create_folder(uploadPath);
      const formData = new FormData();
      formData.append("file", fs.createReadStream(file[0].filepath));
      formData.append(
        "public_id",
        file[0].originalFilename
          .trim()
          .replaceAll(" ", "_")
          .replace(/\.[^.\/]+$/, "")
      );
      formData.append("resource_type", "raw");
      formData.append("folder", uploadPath);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      const { data } = await axios.post(
        process.env.UPLOAD_CLOUDINARY_URL,
        formData
      );

      if (!data || !data.secure_url) {
        const error = new Error("Cannot upload File");
        error.statusCode = 500;
        throw error;
      }

      const uploadedFileUrl = data.secure_url;

      await Assignment.findByIdAndUpdate(assignmentId, {
        $push: {
          responses: {
            user: classUser._id,
            submittedFilePath: uploadedFileUrl,
            submittedOn: new Date(),
            ...(userComment.trim().length > 0 && { comment: userComment }),
          },
        },
      });

      return res
        .status(200)
        .json(manageResponses(200, "Assignment submitted successfully!"));
    } catch (error) {
      await cloudinary.api.delete_folder(uploadPath);
      console.log(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }

      return res
        .status(error.statusCode)
        .json(manageResponses(error.statusCode, error.message));
    }
  }

  if (req.method === "DELETE") {
    const authObj = await checkAuthorization(req, res);
    if (!authObj) {
      const error = new Error("Sign in required!");
      error.statusCode = 401;
      throw error;
    }

    try {
      const { user } = authObj;
      let filter = { _id: user._id };

      if (!user._id) {
        filter = { "credentials.email": user.email };
      }

      const { assignmentId } = req.query;
      await db.connect();

      let ObjectId = mongoose.Types.ObjectId;
      if (!ObjectId.isValid(assignmentId)) {
        const error = new Error("Invalid Assignment Id!");
        error.statusCode = 422;
        throw error;
      }

      const classUser = await User.findOne(filter);
      const classAssignment = await Assignment.findById(assignmentId);

      if (!classAssignment) {
        const error = new Error("Assignment do not exists!");
        error.statusCode = 404;
        throw error;
      }

      const userResponse = classAssignment.responses[0];

      if (!userResponse || !userResponse.submittedFilePath) {
        const error = new Error("Submission do not exists!");
        error.statusCode = 404;
        throw error;
      }

      let publicId = userResponse.submittedFilePath.split("assignments")[1];
      publicId = "assignments" + publicId.replace(/\.[^.\/]+$/, "");

      await cloudinary.api
        .delete_resources([publicId], {
          invalidate: true,
          type: "authenticated",
        })
        .then((result) => console.log(result));

      await cloudinary.api.delete_folder(
        `/assignments/${classAssignment.cloudinaryId}/submissions/${classUser._id}`
      );

      const projection = {
        _id: 0,
        cloudinaryId: 1,
        responses: { $elemMatch: { user: classUser._id } },
      };

      await Assignment.findOneAndUpdate(
        { _id: assignmentId },
        { $pull: { responses: { user: classUser._id } } },
        {
          returnOriginal: true,
          projection,
        }
      );

      return res
        .status(200)
        .json(manageResponses(200, "Submission removed successfully!"));
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }

      return res
        .status(error.statusCode)
        .json(manageResponses(error.statusCode, error.message));
    }
  }

  return res.status(400).json({
    status: 400,
    message: "Bad Request!",
  });
};

export default handler;
