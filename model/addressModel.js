import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    phone: {
      type: Number,
    },
    phonesec: {
      type: Number,
    },
    firstat:{
        type: String,
    },
    secndat:{
        type: String,
    },
    city:{
        type: String,
    },
    pin: {
        type: Number,
    },
    state:{
        type: String,
    },
    },
  { timestamps: true }
);

export default mongoose.model("address", addressSchema);