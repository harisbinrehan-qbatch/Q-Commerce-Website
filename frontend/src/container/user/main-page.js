import { useSelector } from 'react-redux';
import UserModuleHeader from '../../components/user-module-heading';
import UserProducts from '../../components/user-products';

import './style.css';

function UserMainPage() {
  const { data: products } = useSelector((state) => state.products);

  return (
    <div className={products.length !== 0 && 'user-main-page'}>
      <UserModuleHeader />
      <div className="d-flex">
        <div className="scrollable-section">
          <UserProducts />
        </div>
      </div>
    </div>
  );
}
export default UserMainPage;
