import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import CustomNavbar from '../components/navbar';

import './style.css';

const UserLayout = ({ children, setIsLoggedIn }) => {
  const { productsLoading } = useSelector((state) => state.products);
  const { authLoading } = useSelector((state) => state.authentication);

  return (
    <div>
      <CustomNavbar
        name="Haris Bin Rehan"
        userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
        setIsLoggedIn={setIsLoggedIn}
      />
      {(authLoading || productsLoading) && (
        <div className="loading-overlay">
          <ReactLoading type="bars" color="#38b6f1" height={100} width={100} />
        </div>
      )}
      <div className="">{children}</div>
    </div>
  );
};

export default UserLayout;
