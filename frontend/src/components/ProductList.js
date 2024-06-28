import React from 'react';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="products-container">
            {products.map(product => (
                <div key={product.product_id} className="product">
                    <img src={product.photo_path} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button onClick={() => addToCart(product.product_id, product.price)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
