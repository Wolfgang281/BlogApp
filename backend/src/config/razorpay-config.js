import Razorpay from "razorpay";
import { RAZORPAY } from "./index.js";

let razorpay = new Razorpay({
  key_id: RAZORPAY.API_KEY,
  key_secret: RAZORPAY.KEY_SECRET,
});

export default razorpay;
