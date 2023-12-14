import fs from 'fs';
import Product from '../../models/product';

const DeleteProduct = async (req, res) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res
        .status(400)
        .json({ message: 'Bad Request: _id parameter is missing.' });
    }

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: 'Not Found: Product not found or deletion failed.' });
    }

    if (deletedProduct.images && deletedProduct.images.length > 0) {
      deletedProduct.images.forEach((img) => {
        const filePath = `uploads/${img}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error Deleting File: ${img}`);
          }
        });
      });
    }

    return res
      .status(200)
      .json({ message: 'Success: Product deleted successfully' });
  } catch (err) {
    console.error(`Internal Server Error: ${err.message}`);
    return res.status(500).json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default DeleteProduct;
