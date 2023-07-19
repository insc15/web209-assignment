import joi from "joi";
import Product from "../models/product";
import Category from "../models/category";
import cloudinary from "cloudinary";

cloudinary.config({ 
  cloud_name: 'dpudrx9vt', 
  api_key: '261937952884313', 
  api_secret: 'WRM16LpPW2QQL3xpMdm5pZ2AGGo' 
});

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  categoryId: joi.string().required(),
  discount_price: joi.number().required(),
  short_description: joi.string().required(),
  stock: joi.number().required(),
  author: joi.string().required(),
  publisher: joi.string(),
  page_num: joi.number(),
  publishing_year: joi.string(),
  language: joi.string(),
});

export const getAll = async (req, res) => {
  try {
    // const { data: products } = await axios.get(`${API_URI}/products`);
    const products = await Product.find().populate("categoryId");
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async function (req, res) {
  try {
    // const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    if (!product) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

async function uploadStream(file) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (err, res) => {
      if (err) {
        // console.log(err);
        reject(err);
      } else {
        // console.log(res);
        resolve(res);
      }
    }).end(file.buffer);
  });
}

export const create = async function (req, res) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const {secure_url} = await uploadStream(req.file);
    req.body.image = secure_url;
    // const { data: product } = await axios.post(`${API_URI}/products`, req.body);
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: "Không thêm được sản phẩm",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
