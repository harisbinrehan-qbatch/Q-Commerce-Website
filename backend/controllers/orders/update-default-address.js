import Address from '../../models/address';

const UpdateDefaultAddress = async (req, res) => {
  try {
    const { email } = req.user || '';
    const { addressId } = req.body;

    const existingAddresses = await Address.find({ email });

    if (existingAddresses) {
      existingAddresses.forEach((address) => {
        if (address._id.toString() === addressId) {
          address.addressInfo.isDefault = true;
        } else {
          address.addressInfo.isDefault = false;
        }
        address.save();
      });
    } else {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Default address has been updated successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default UpdateDefaultAddress;
