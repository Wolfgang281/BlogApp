import { StatusCodes } from "http-status-codes";

import mongoose from "mongoose";
import BlogModel from "../models/blog-model.js";
import UserModel from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary-util.js";

//& to add a blog (title, description, category, coverImage)
export const addBlog = async (req, res, next) => {
  try {
    console.log(req.file);
    let userId = req.user._id;
    let { title, description, category } = req.body;

    let imageURL = "";
    let publicId = "";
    if (req.file) {
      //? if file is sent from frontend, then only call uploadToCloud()
      let { secure_url, public_id } = await uploadToCloudinary(
        req.file.path,
        next,
      );
      // console.log("uploadedResponse: ", uploadedResponse);
      imageURL = secure_url;
      publicId = public_id;
    }

    let newBlog = await BlogModel.create({
      title,
      description,
      category,
      createdBy: userId,
      coverImage: { imageURL, publicId },
    });

    await UserModel.findByIdAndUpdate(userId, { $inc: { totalBlogs: 1 } });

    await UserModel.findByIdAndUpdate(userId, {
      $push: { blogs: { blogId: newBlog._id } },
    });

    // await UserModel.findByIdAndUpdate(userId, {
    //   $push: { blogs: { blogId: newBlog._id } },
    //   $inc: { totalBlogs: 1 },
    // });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Blog Added Successfully",
      newBlog,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    let blogs = await BlogModel.find();
    if (blogs.length === 0)
      return next(new AppError("No Blogs Found", StatusCodes.NOT_FOUND));

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Blogs Fetched Successfully",
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    // let blog = await BlogModel.findById(req.params.blogId).populate({
    //   path: "createdBy",
    //   select: "name email totalBlogs",
    // });

    let blog = await BlogModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.blogId) } },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "createdBy",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
      {
        $project: {
          name: "$createdBy.name",
          email: "$createdBy.email",
          totalBlogs: "$createdBy.totalBlogs",
          title: 1,
          description: 1,
          coverImage: 1,
          category: 1,
        },
      },
    ]);
    if (blog.length === 0)
      return next(new AppError("No Blog Found", StatusCodes.NOT_FOUND));

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Blog Fetched Successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    let { blogId } = req.params;
    let userId = req.user._id;

    let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
    // console.log("blog: ", blog); // {}
    let oldPublicId = blog?.coverImage?.publicId;
    console.log("oldPublicId: ", oldPublicId);
    if (!blog)
      return next(new AppError("No Blog Found", StatusCodes.NOT_FOUND));

    //! update blog details like title description and category
    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.category = req.body.category || blog.category;
    //! at this point we are just assigning the new values, in database still old values are stored, to update the data use save()

    let publicId;
    let imageURL;

    if (req.file) {
      //! user wants to update the image
      //? upload the new image, delete the old one from cloudinary and replace the secure_url and public_id with the new one in database
      let { secure_url, public_id } = await uploadToCloudinary(
        req.file.path,
        next,
      );
      publicId = public_id;
      imageURL = secure_url;

      blog.coverImage.imageURL = imageURL;
      blog.coverImage.publicId = publicId;
    }

    let updatedBlog = await blog.save();

    //! delete the old image -> delete the image, if it is previously uploaded on cloudinary
    if (blog.coverImage.imageURL.includes("https://res.cloudinary.com")) {
      let deletedResp = await deleteFromCloudinary(oldPublicId, next);
      console.log("deletedResp: ", deletedResp);
    }

    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let { blogId } = req.params;

    let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
    if (!blog)
      return next(new AppError("No Blog Found", StatusCodes.NOT_FOUND));

    // Delete image from Cloudinary if it was uploaded there
    if (blog.coverImage?.publicId) {
      await deleteFromCloudinary(blog.coverImage.publicId, next);
    }

    await BlogModel.findByIdAndDelete(blogId);

    await UserModel.findByIdAndUpdate(userId, {
      $inc: { totalBlogs: -1 },
      $pull: { blogs: { blogId: blog._id } },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogImage = async (req, res, next) => {
  try {
    let { blogId } = req.params;
    let userId = req.user._id;

    //! 1) find the blog and verify ownership
    let blog = await BlogModel.findOne({ _id: blogId, createdBy: userId });
    if (!blog)
      return next(new AppError("No Blog Found", StatusCodes.NOT_FOUND));

    //! 2) check if there's actually an image to delete
    let { imageURL, publicId } = blog.coverImage;
    if (!imageURL || !publicId)
      return next(
        new AppError(
          "This blog has no cover image to delete",
          StatusCodes.BAD_REQUEST,
        ),
      );

    //! 3) delete from Cloudinary using the stored publicId
    await deleteFromCloudinary(publicId, next);

    //! 4) reset coverImage fields in DB
    blog.coverImage.imageURL = "";
    blog.coverImage.publicId = "";
    await blog.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Cover image deleted successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

/* 
let req.file = {
  fieldname: 'coverImage',
  originalname: 'authorize.png',        
  encoding: '7bit',
  mimetype: 'image/png',
  destination: './uploads',
  filename: '1774674812705---authorize.png',
  path: 'uploads\\1774674812705---authorize.png',
  size: 42757
}

data buckets --> ec2(aws), azure, cloudinary

let uploadedResponse:  {
  asset_id: '1fc0cb6b598596620e00739b67a00348',
  public_id: 'blogApp/vldsqvdgabxhim1dsjxs',
  version: 1774676178,
  version_id: 'ad96f96191675151f39daf243ce8dcf2',
  signature: 'afa1ce8019c53a3b0f03632648c58982a42386cf',
  width: 1237,
  height: 326,
  format: 'png',
  resource_type: 'image',
  created_at: '2026-03-28T05:36:18Z', 
  tags: [],
  bytes: 42757,
  type: 'upload',
  etag: 'c64292e0b86374e5cc451dfde33efd33',
  placeholder: false,
  url: 'http://res.cloudinary.com/dynuatcqe/image/upload/v1774676178/blogApp/vldsqvdgabxhim1dsjxs.png',
  secure_url: 'https://res.cloudinary.com/dynuatcqe/image/upload/v1774676178/blogApp/vldsqvdgabxhim1dsjxs.png',   
  asset_folder: 'blogApp',
  display_name: 'vldsqvdgabxhim1dsjxs',
  original_filename: '1774676176520---authorize',
  api_key: '334918679458119'
}
*/

//? updation part -> {$inc: {fieldname: +/-value}}
//? blogs = [{}]
//? {blogId}
