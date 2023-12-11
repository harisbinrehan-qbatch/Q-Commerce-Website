import Notification from '../../models/notification';

const ReadNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    const updatedNotification = await Notification.updateOne(
      { _id: notificationId },
      { $set: { isRead: true } }
    );

    if (updatedNotification.nModified === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    return res.status(200).json(updatedNotification);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default ReadNotification;
