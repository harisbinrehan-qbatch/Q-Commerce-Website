import { EditOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import CustomNavbar from '../components/navbar';

import { setTheme } from '../redux/slices/authentication';

import './style.css';

const UserLayout = ({ children, setIsLoggedIn }) => {
  const dispatch = useDispatch();

  const { productsLoading } = useSelector((state) => state.products);
  const { authLoading, theme } = useSelector((state) => state.authentication);

  const handleSetTheme = (selectedTheme) => {
    dispatch(setTheme(selectedTheme));
  };

  document.body.className = theme;

  return (
    <div>
      <CustomNavbar
        name="Haris Bin Rehan"
        userImage="/Users/qbatch/Desktop/project/src/assets/Bell.png"
        setIsLoggedIn={setIsLoggedIn}
      />
      {(authLoading || productsLoading) && (
        <div className="loading-overlay">
          <ReactLoading type="bars" color="green" height={100} width={100} />
        </div>
      )}
      <div className="cart-main-div">{children}</div>
      <div>
        <FloatButton.Group
          trigger="click"
          type="primary"
          icon={<EditOutlined />}
          tooltip={<div>Themes</div>}
        >
          <FloatButton
            description="Dark"
            shape="square"
            style={{ right: 164 }}
            onClick={() => handleSetTheme('dark')}
          />
          <FloatButton
            description="Light"
            shape="square"
            style={{ right: 164 }}
            onClick={() => handleSetTheme('light')}
          />
        </FloatButton.Group>
      </div>
    </div>
  );
};

export default UserLayout;
