import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({}); // Boş bir nesne ile başlatılıyor
  const { id } = match.params;
console.log('Product ID:', id);

  useEffect(() => {
    getProductById(id)
      .then(response => {
        console.log('API Response:', response.data); // API'den dönen veriyi konsola yazdır
        setProduct(response.data); // Ürün bilgilerini state'e ayarla
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]); // 'id' değiştiğinde yeniden yükleme yapılacak

  return (
    <div>
      <h2>Product Detail</h2>
      {product && (
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
