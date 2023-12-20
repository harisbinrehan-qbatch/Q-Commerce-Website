import { useEffect, useState } from 'react';
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

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleSetTheme = (selectedTheme) => {
    console.log({ selectedTheme }, { isDarkMode });
    if (selectedTheme === 'default') {
      dispatch(setTheme('default'));
    } else if (selectedTheme === 'light') {
      dispatch(setTheme('light'));
    } else if (selectedTheme === 'dark') {
      dispatch(setTheme('dark'));
    }
  };

  useEffect(() => {
    console.log('You are coming here');
    if (theme === 'default') {
      if (isDarkMode) {
        document.body.className = 'dark';
      } else {
        document.body.className = 'light';
      }
    } else {
      document.body.className = theme;
    }
  }, [theme, isDarkMode]);

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
            description="dark"
            shape="square"
            style={{ right: 164 }}
            onClick={() => handleSetTheme('dark')}
          />

          <FloatButton
            description="light"
            shape="square"
            style={{ right: 164 }}
            onClick={() => handleSetTheme('light')}
          />
          <FloatButton
            description="default"
            shape="square"
            style={{ right: 164 }}
            onClick={() => handleSetTheme('default')}
          />
        </FloatButton.Group>
      </div>
    </div>
  );
};

export default UserLayout;
