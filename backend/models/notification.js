import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    required: true
  },
  forAdmin: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const NotificationModel = mongoose.model('notification', NotificationSchema);

export default NotificationModel;
