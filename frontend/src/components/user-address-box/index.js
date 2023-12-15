import { useDispatch, useSelector } from 'react-redux';
import CustomBtn from '../button';
import { updateDefaultAddress } from '../../redux/slices/cart';

const AddressBox = ({
  name,
  mobile,
  address,
  disableCustomBtn,
  isDefault,
  addressId
}) => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.authentication);
  document.body.className = theme;

  const handleSetDefaultAddress = () => {
    dispatch(updateDefaultAddress({ addressId }));
  };

  return (
    <div className="d-flex">
      <div className="container p-2">
        <div className="d-flex gap-2">
          <strong>Deliver to:</strong>
          <p>{name}</p>
        </div>
        <div className="d-flex gap-2">
          <strong>Mobile:</strong>
          <p>{mobile}</p>
        </div>
        <div className="d-flex gap-2">
          <strong>Address:</strong>
          <p>{address}</p>
        </div>
      </div>
      <div>
        {!disableCustomBtn && (
          <div className="m-3">
            <CustomBtn
              btnText="Default"
              variant={isDefault ? 'secondary disabled' : 'outline-primary'}
              onClick={handleSetDefaultAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBox;
