//! create payment
//! verify payment

import { ApiError } from "@google/genai";
import { StatusCodes } from "http-status-codes";
import { AI_FEATURE_PRICE } from "../config/index.js";
import razorpay from "../config/razorpay-config.js";

// payment done -> razorpay

export const createPayment = async (req, res, next) => {
  try {
    let amount = AI_FEATURE_PRICE;

    razorpay.orders.create(
      {
        amount,
        currency: "INR",
        receipt: `receipt_${req.user._id}`,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          throw new ApiError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
        }

        res.status(200).json({ data });
        // save in db
        // along with that send api key
      },
    );

    //! api_Secret
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {};
