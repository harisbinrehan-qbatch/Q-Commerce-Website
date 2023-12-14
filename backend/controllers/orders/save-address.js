import Address from '../../models/address';

const SaveAddress = async (req, res) => {
  try {
    const { email } = req.user;
    const { ...addressInfo } = req.body;

    const existingAddresses = await Address.find({ email });

    if (existingAddresses.length > 0) {
      if (addressInfo.isDefault === true) {
        existingAddresses.forEach((address) => {
          address.addressInfo.isDefault = false;
          address.save();
        });
      }
    } else {
      const newAddress = new Address({
        email,
        addressInfo: {
          ...addressInfo,
          isDefault: true
        }
      });

      await newAddress.save();
    }

    res.status(201).json({ message: 'Address has been saved successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default SaveAddress;
