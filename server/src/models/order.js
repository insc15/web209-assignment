import mongoose from 'mongoose';

const order = new mongoose.Schema(
    {
        paymentMethod: {
            type: String,
            default: 'cod',
            enum: ['cod', 'basc']
        },
        transactionId: {
            type: String,
        },
        total: {
            type: Number,
            require: true,
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
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model('Order', order);
