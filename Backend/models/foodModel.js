import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  updated: { type: Date, default: Date.now},
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
