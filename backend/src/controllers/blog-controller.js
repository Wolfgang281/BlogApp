import { StatusCodes } from "http-status-codes";

import BlogModel from "../models/blog-model.js";
import AppError from "../utils/app-error-util.js";
import { uploadToCloudinary } from "../utils/cloudinary-util.js";

//& to add a blog (title, description, category, coverImage)
export const addBlog = async (req, res, next) => {
  //   console.log(req.file);
  let userId = req.user._id;
  let { title, description, category } = req.body;

  let imageURL = "";
  let publicId = "";
  if (req.file) {
    //? if file is sent from frontend, then only call uploadToCloud()
    let { secure_url, public_id } = await uploadToCloudinary(req.file.path);
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

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Blog Added Successfully",
    newBlog,
  });
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
    let blog = await BlogModel.findById(req.params.blogId);
    if (!blog)
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
    if (!blog)
      return next(new AppError("No Blog Found", StatusCodes.NOT_FOUND));
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
