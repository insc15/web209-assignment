import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            require: true,
            min: 0,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model('OrderProduct', orderProductSchema);