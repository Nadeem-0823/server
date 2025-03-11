import Notification from '../models/notificationModel.js';

export const getNotification = async (req, res) => {
  try {
    const notification = await Notification.find({ userId: req.user.id, read: false });
    res.status(200).json({
        success:true,
        notification });
  } catch (error) {
    res.status(500).json({ 
        success:false,
        message: "Error fetching notification", error });
  }
};