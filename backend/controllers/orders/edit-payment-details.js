import { stripeSecretKeyClient } from '../../config/config';

const EditPaymentDetails = async (req, res) => {
  try {
    const { stripeId } = req.user;
    const {
      cardStripeId,
      paymentDetails
    } = req.body;

    await stripeSecretKeyClient.customers.updateSource(stripeId, cardStripeId, {
      exp_month: paymentDetails.exp_month,
      exp_year: paymentDetails.exp_year
    });

    return res.status(200).json({ message: 'Payment details updated successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

export default EditPaymentDetails;
