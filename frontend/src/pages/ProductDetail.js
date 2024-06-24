import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({}); // Boş bir nesne ile başlatılıyor
  const { id } = match.params;

  useEffect(() => {
    getProductById(id).then(response => {
      setProduct(response.data);
    });
  }, [id]); // 'id' değiştiğinde yeniden yükleme yapılacak

  return (
    <div>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
