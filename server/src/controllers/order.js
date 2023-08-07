import joi from "joi";
import Order from "../models/order";
import User from "../models/user";
import cloudinary from "cloudinary";
import OrderProduct from "../models/orderProduct";
import { createPayment } from "../services/payment";
import Product from "../models/product";

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
    phone: joi.string().required(),
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
        const userId = req.query.userId;
        const order = await Order.find({
            userId: userId,
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
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.json({
                message: "Không có đơn hàng nào",
            });
        }

        const orderProduct = await OrderProduct.find({
            orderId: req.params.id
        }).populate('productId')

        const resOrder = {
            ...order._doc,
            items: orderProduct
        }
        
        return res.json(resOrder);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const getByUserId = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.json({
                message: "Không có đơn hàng nào",
            });
        }

        const orders = await Order.find({
            userId: req.params.id
        })

        if (!orders) {
            return res.json({
                message: "Không có đơn hàng nào",
            });
        }

        const newOrders = []

        for (const order of orders) {
            const orderProduct = await OrderProduct.find({
                orderId: order._id
            }).populate('productId')

            const resOrder = {
                ...order._doc,
                items: orderProduct
            }

            newOrders.push(resOrder)
        }

        return res.json(newOrders);
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
            const { payUrl } = await createPayment(order._id, "test", order.total, `http://localhost:8080/api/order-received`, "payWithATM");
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
        const order = await Order.findById(req.query.orderId)

        if(order){
            const orderProduct = await OrderProduct.find({
                orderId: req.query.orderId
            })

            for (const product of orderProduct) {
                const productUpdate = await Product.findById(product.productId)
                productUpdate.stock -= product.quantity
                await productUpdate.save()
            }
            if( req.query.resultCode == 0 && order.status == 'Pending'){
                order.status = "Completed"
                order.transactionId = req.query.transId
                await order.save()
            }

            return res.redirect(`http://localhost:5173/order-received/${order._id}`)
        }else{
            return res.redirect(`http://localhost:5173/order-received/${order._id}`)
        }
    } catch (error) {
        return res.status(400)
    }
}

export const initPay = async function (req, res) {
    try {
        const order = await Order.findById(req.query.orderId)

        if(order){
            if(order.paymentMethod == 'basc') {
                const { payUrl } = await createPayment(order._id, "test", order.total, `http://localhost:8080/api/order-received`, "payWithATM");
                return res.json({
                    message: "Khởi tạo thanh toán thành công",
                    payUrl,
                });
            }else{
                return res.json({
                    message: "Phương thức thanh toán không hợp lệ",
                });
            }
        }else{
            return res.status(400)
        }
    } catch (error) {
        return res.status(400)
    }
}