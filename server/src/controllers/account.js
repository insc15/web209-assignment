import joi from 'joi';
import user from '../models/user';


const accountSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().valid('user', 'admin').required(),
});

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await user.find();
    if (accounts.length === 0) {
      return res.json({
        message: 'Không có tài khoản nào',
      });
    }
    return res.json(accounts);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const account = await user.findById(req.params.id);
    if (!account) {
      return res.json({
        message: 'Không tìm thấy tài khoản',
      });
    }
    return res.json(account);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { error } = accountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    
    const account = await user.create(req.body);
    return res.json({
      message: 'Tạo tài khoản thành công',
      account,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const account = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!account) {
      return res.status(400).json({
        message: 'Cập nhật tài khoản không thành công',
      });
    }
    return res.json({
      message: 'Cập nhật tài khoản thành công',
      account,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeAccount = async (req, res) => {
  try {
    const account = await user.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Xóa tài khoản thành công',
      account,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
