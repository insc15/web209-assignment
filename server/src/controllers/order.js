import joi from "joi";
import Order from "../models/order";
import User from "../models/user";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import OrderProduct from "../models/orderProduct";
import { createPayment } from "../services/payment";

cloudinary.config({
    cloud_name: 'dpudrx9vt',
    api_key: '261937952884313',
    api_secret: 'WRM16LpPW2QQL3xpMdm5pZ2AGGo'
});

const orderSchema = joi.object({
    paymentMethod: joi.string().valid('basc', 'cod').default('cod'),
    transactionId: joi.string(),
    status: joi.string().valid('Pending', 'Shipping', 'Completed', 'Cancelled').default('Pending'),
    userId: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    district: joi.string().required(),
    phoneNumber: joi.string().required(),
    items: joi.array().items(
        joi.object({
            _id: joi.string().required(),
            quantity: joi.number().required(),
        })
    ),
    total: joi.number().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    note: joi.string().allow(null, ''),
});

export const getAll = async (req, res) => {
    try {
        const order = await Order.find({
        }).populate("User");
        if (order.length === 0) {
            return res.json({
                message: "Không có đơn hàng nào",
            });
        }
        return res.json(order);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const getById = async function (req, res) {
    try {
        // const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
        const order = await Order.findById(req.params.id).populate(
            "User"
        );
        if (!order) {
            return res.json({
                message: "Không có đơn hàng nào",
            });
        }
        return res.json(order);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const create = async function (req, res) {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        // const { data: product } = await axios.post(`${API_URI}/products`, req.body);
        const order = await Order.create(req.body);
        if (req.body.items && Array.isArray(req.body.items)) {
            req.body.items.map(async (item) => {
                await OrderProduct.create({
                    orderId: order._id,
                    productId: item._id,
                    quantity: item.quantity
                })
            })
        } else {
            return res.json({
                message: "Không thêm được sản phẩm",
            });
        }
        if (!order) {
            return res.json({
                message: "Không thêm được sản phẩm",
            });
        }
        await User.findByIdAndUpdate(order.userId, {
            $addToSet: {
                orders: order._id,
            },
        });

        if(order.paymentMethod == 'basc') {
            const { payUrl } = await createPayment(order._id, "test", order.total, `http://localhost:5173/order/${order._id}`, "payWithATM");
            return res.json({
                message: "Thêm đơn hàng thành công",
                payUrl,
                data: order,
            });
        }else{
            return res.json({
                message: "Thêm đơn hàng thành công",
                data: order,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!order) {
            return res.json({
                message: "Cập nhật đơn hàng không thành công",
            });
        }
        return res.json({
            message: "Cập nhật đơn hàng thành công",
            data: order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function (req, res) {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa đơn hàng thành công",
            order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const paymentIPN = async function (req, res) {
    try {
        console.log(1);
        const order = await Order.findById(req.body.orderId)
        if(order){
            order.status = "Completed"
            order.transactionId = req.body.transId
            await order.save()
            return res.status(204)
        }
    } catch (error) {
        return res.status(400)
    }
}