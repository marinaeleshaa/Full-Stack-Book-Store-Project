import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },

    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    category: {
      type: String,
      enum: ["action", "drama", "comedy", "romance", "horror", "sci-fi"],
      required: [true, "Category is required"],
    },

    Url: {
      type: String,
      required: [true, "Image URL is required"],
      // match: [
      //   /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/,
      //   "Must be a valid image URL",
      // ],
    },

    oldPrice: {
      type: Number,
      required: [true, "Old price is required"],
      min: [0, "Old price cannot be negative"],
    },

    discountedPrice: {
      type: Number,
      required: [true, "Discounted price is required"],
      min: [0, "Discounted price cannot be negative"],
      validate: {
        validator: function (val) {
          return val < this.oldPrice;
        },
        message: "Discounted price must be less than old price",
      },
    },

    publishedYear: {
      type: Number,
      min: [1500, "Published year must be after 1500"],
      max: [new Date().getFullYear(), "Published year cannot be in the future"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", BookSchema);
