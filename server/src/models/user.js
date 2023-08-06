import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: 'member',
      // enum: ["member", "admin"]
    },
    orders:
      [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Order'
        }
      ]

  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('users', userSchema);
