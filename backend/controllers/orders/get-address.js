import Address from '../../models/address';

const GetAddress = async (req, res) => {
  try {
    const { email } = req.user;

    const userAddresses = await Address.find({ email });

    const addresses = userAddresses.map((address) => ({
      _id: address._id,
      ...address.addressInfo
    }));

    res.status(200).json(addresses);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default GetAddress;
