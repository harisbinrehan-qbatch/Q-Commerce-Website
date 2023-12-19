import { useEffect } from 'react';
import { Image } from 'antd';
import {
// LeftCircleFilled,
// RightCircleFilled
} from '@ant-design/icons';

import './style.css';

const AutoImageChange = ({
  images,
  onChange,
  // handleNextImage,
  // handlePreviousImage,
  product,
  currentImageIndex,
  setCurrentImageIndex
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (images && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images]);

  useEffect(() => {
    onChange(currentImageIndex);
  }, [currentImageIndex, onChange]);

  return (
    <div className="d-flex">
      {/* <div className="justify-content-center align-items-center">
        <LeftCircleFilled
          className={`product-display-image-button me-3 ${
            currentImageIndex === 0 || !images || !images.length
              ? ''
              : 'enabled-icon'
          }`}
          onClick={handlePreviousImage}
          // disabled={currentImageIndex === 0 || !images || !images.length}
        />
      </div> */}
      {images && images[currentImageIndex] && (
        <Image.PreviewGroup
          items={product.images.map(
            (image) => `http://localhost:5000/${image}`
          )}
        >
          <Image
            src={`http://localhost:5000/${images[currentImageIndex]}`}
            alt="product"
            className="user-products-display-image"
            width={300}
            height={350}
          />
        </Image.PreviewGroup>
      )}

      {/* <div className="justify-content-center align-items-center">
        <RightCircleFilled
          onClick={handleNextImage}
          className={`product-display-image-button ms-3 ${
            currentImageIndex
            === (product?.images ? product.images.length - 1 : 0)
              ? ''
              : 'enabled-icon'
          }`}
          disabled={
            currentImageIndex
            === (product?.images ? product.images.length - 1 : 0)
          }
        />
      </div> */}
    </div>
  );
};

export default AutoImageChange;
