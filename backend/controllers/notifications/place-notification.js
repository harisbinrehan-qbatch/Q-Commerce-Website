import Notification from '../../models/notification';

const PlaceNotification = async (req, res) => {
  try {
    const {
      email,
      text
    } = req.body;

    const newNotification = new Notification({
      email,
      text,
      isRead: false
    });

    const savedNotification = await newNotification.save();

    return res.status(201).json(savedNotification);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default PlaceNotification;
