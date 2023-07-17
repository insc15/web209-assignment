import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
    },
    price: {
      type: Number,
    },
    desc: {
      type: String,
      require: true,
      minLength: 3,
    },
    image: {
      type: String,
      require: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    discount_price: {
      type: Number,
    },
    short_desc: {
      type: String,
      minLength: 3,
    },
    stock: {
      type: Number,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publisher: {
      type: String,
    },
    page_num: {
      type: Number,
    },
    publishing_year: {
      type: String,
    },
    language: {
      type: String,
    }


  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productSchema);
