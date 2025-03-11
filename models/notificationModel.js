import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["Budget Alert", "Reminder"],
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
  },

  { timestamps: true }

);

const notificationModel = mongoose.model('Notification', NotificationSchema)
export default notificationModel;
