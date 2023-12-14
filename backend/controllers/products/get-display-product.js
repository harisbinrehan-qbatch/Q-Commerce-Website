import Product from '../../models/product';

const FetchDisplayProduct = async (req, res) => {
  try {
    const { _id } = req.query;

    const displayProduct = await Product.findOne({ _id });

    if (!displayProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ displayProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default FetchDisplayProduct;
