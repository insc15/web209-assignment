import mongoose from 'mongoose';

const order = new mongoose.Schema(
    {
        paymentMethod: {
            type: String,
            default: 'Cash',
            enum: ['Cash', 'Card']
        },
        transactionId: {
            type: String,
        },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'Shipping', 'Completed', 'Cancelled']
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        address: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        district: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        note: {
            type: String,
            require: true,
        },
        priceTotal: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Order', order);
