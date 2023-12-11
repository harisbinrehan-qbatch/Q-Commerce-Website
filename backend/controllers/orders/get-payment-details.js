import { stripeSecretKeyClient } from '../../config/config';

const GetPaymentDetails = async (req, res) => {
  try {
    const {
      username,
      stripeId
    } = req.user;

    const cards = await stripeSecretKeyClient.customers.listSources(
      stripeId,
      { object: 'card' }
    );

    const allPaymentMethods = cards.data.map(
      ({
        last4, id, brand, exp_month, exp_year
      }) => ({
        cardholderName: username,
        cardNumber: last4,
        cardId: id,
        brand,
        exp_month,
        exp_year
      })
    );

    return res.status(200).json({ allPaymentMethods });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default GetPaymentDetails;
