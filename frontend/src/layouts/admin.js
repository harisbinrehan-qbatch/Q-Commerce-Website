import { useLocation } from 'react-router';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import CustomSidebar from '../components/admin-sidebar';
import CustomNavbar from '../components/navbar';

const AdminLayout = ({ children, setIsLoggedIn }) => {
  const location = useLocation();
  const { productsLoading } = useSelector((state) => state.products);
  const { authLoading } = useSelector((state) => state.authentication);

  const { pathname } = location;

  return (
    <div>
      {pathname !== '/admin/order-details' ? (
        <>
          <CustomNavbar
            name="Haris Bin Rehan"
            userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
            setIsLoggedIn={setIsLoggedIn}
          />
          <div className="d-flex">
            <CustomSidebar />
            <div className="w-100 pt-4 admin-layout-wrapper">{children}</div>
          </div>
        </>
      ) : (
        <div className="d-flex">
          <div className="w-100 p-4">{children}</div>
        </div>
      )}
      {(authLoading || productsLoading) && (
        <div className="loading-overlay">
          <ReactLoading
            type="spokes"
            color="green"
            height={100}
            width={100}
          />
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
