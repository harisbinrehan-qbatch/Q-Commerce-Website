import ReactLoading from 'react-loading';
import { Empty, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchDisplayProduct,
  fetchUserProducts
} from '../../redux/slices/products';
import UserProductsDisplay from '../user-products-display';
import CustomBtn from '../button';

import './style.css';

const UserProducts = () => {
  const { data: products, displayProduct } = useSelector(
    (state) => state.products
  );
  const { totalCount, isFilter, productsLoading } = useSelector(
    (state) => state.products
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(4);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useDispatch();

  const handleScroll = () => {
    if (
      scrollEnabled
      && window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      if (!loadingMore) {
        setLoadingMore(true);
      }
    }
  };

  useEffect(() => {
    let updatedSkip = skip;
    let updatedLimit = limit;
    if (totalCount === 0) {
      if (isFilter === false) {
        dispatch(fetchUserProducts({ skip: 0, limit: 4 }));
      }
    } else if (loadingMore && skip + limit !== totalCount) {
      if (skip + 4 < totalCount) {
        updatedSkip = skip + 4;
        updatedLimit = updatedSkip + 4 > totalCount ? totalCount - updatedSkip : 4;
        setSkip(updatedSkip);
        setLimit(updatedLimit);
      } else {
        updatedLimit = totalCount - skip;
        updatedSkip = skip;
        setSkip(updatedSkip);
        setLimit(updatedLimit);
        setScrollEnabled(false);
      }
      if (isFilter === false) {
        dispatch(fetchUserProducts({ skip: updatedSkip, limit: updatedLimit }));
      }
    }
    setLoadingMore(false);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadingMore]);

  const showProductDetails = (product) => {
    console.log({ product });
    dispatch(fetchDisplayProduct(product._id));
    setCurrentImageIndex(0);
  };

  return (
    <div style={{ paddingTop: '115px' }}>
      {products.length === 0 && productsLoading === false ? (
        <div className="d-flex empty-state-page product-empty-status">
          <Empty
            description={<span className="heading">No products found.</span>}
          />
        </div>
      ) : (
        <div className="d-flex ps-5 pt-3">
          <div className="d-flex gap-5 p-4 flex-wrap user-products-main-div">
            {products.map((product) => (
              <div className="product-div p-3" key={product.id}>
                <Image.PreviewGroup
                  items={[`http://localhost:5000/${product.images[0]}`]}
                >
                  <div className="blurred-img">
                    <Image
                      width={257}
                      height={300}
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt="product"
                      className="user-product-image"
                      loading="lazy"
                    />
                  </div>
                </Image.PreviewGroup>
                <p className="p-1 flex-wrap w-100">{product.name}</p>
                <div className="d-flex ps-1">
                  <p>Price:</p>
                  <p>{product.price}</p>
                </div>
                <div className="d-flex ps-1">
                  <p>Size:</p>
                  <p className="ps-2">{product.size}</p>
                </div>
                <div className="d-flex justify-content-end">
                  {product.quantity === 0 ? (
                    <div
                      className=""
                      style={{
                        color: 'white',
                        background: 'red',
                        height: '35px',
                        borderRadius: '3px'
                      }}
                    >
                      <strong
                        style={{ fontStyle: 'italic' }}
                        className="d-flex ps-2 pe-2 pt-1 justify-content-around"
                      >
                        Out of Stock
                      </strong>
                    </div>
                  ) : (
                    <CustomBtn
                      btnText="Details"
                      onClick={() => showProductDetails(product)}
                    />
                  )}
                </div>
              </div>
            ))}
            <div>
              {products.length === totalCount ? (
                <b style={{ color: 'grey' }} className="ps-5">
                  No more products found
                </b>
              ) : !isFilter ? (
                <b style={{ color: 'grey' }}>
                  {totalCount}
                  {' '}
                  items found in Clothing & Accessories
                </b>
              ) : null}
            </div>

            <div
              className="d-flex justify-content-center align-items-center gap-2"
              style={{ width: '100%', minHeight: '200px' }}
            >
              {products.length < totalCount && !isFilter && (
                <ReactLoading
                  type="cylon"
                  color="green"
                  height={100}
                  width={100}
                />
              )}
            </div>
          </div>

          <UserProductsDisplay
            product={displayProduct}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        </div>
      )}
    </div>
  );
};

export default UserProducts;
