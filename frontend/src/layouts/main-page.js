import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import CustomNavbar from '../components/navbar';

const MainPageLayout = ({ children, setIsLoggedIn }) => {
  const { productsLoading } = useSelector((state) => state.products);
  const { authLoading } = useSelector((state) => state.authentication);

  return (
    <div>
      <CustomNavbar
        name=""
        userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
        setIsLoggedIn={setIsLoggedIn}
      />
      {(authLoading || productsLoading) && (
        <div className="loading-overlay">
          <ReactLoading type="spokes" color="green" height={100} width={100} />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default MainPageLayout;
