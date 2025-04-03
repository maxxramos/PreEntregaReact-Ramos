import React, { useState, useRef } from "react";
import { useCart } from "../../context/CartContext";
import carritoIcono from "../../assets/cart.svg";
import { Link } from "react-router-dom";
import "./CartWidget.css";

function CartWidget() {
  const { cart, updateCart, removeFromCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); 
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleIncrease = (id) => {
    const product = cart.find(item => item.id === id);
    updateCart(product, product.quantity + 1);
  };

  const handleDecrease = (id) => {
    const product = cart.find(item => item.id === id);
    if (product.quantity > 1) {
      updateCart(product, product.quantity - 1);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    if (timeoutId) {
      clearTimeout(timeoutId); 
    }
  };

  const handleMouseLeave = () => {
    
    const newTimeoutId = setTimeout(() => {
      setIsVisible(false); 
    }, 3000);
    setTimeoutId(newTimeoutId);
  };

  const handleViewCartClick = () => {
    setIsVisible(false); 
  };

  return (
    <div className="cart-widget">
      <Link
        to="#"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cart-icon"
      >
        <img src={carritoIcono} alt="Carrito" className="cart-svg" />
        {totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
      </Link>

      {isVisible && cart.length > 0 && (
        <div className="cart-summary">
          <h5>Resumen del carrito</h5>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name} - {item.quantity} x ${item.price}</span>
                <div className="quantity-buttons">
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <button onClick={() => handleRemove(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <Link to="/cart" className="view-cart-btn" onClick={handleViewCartClick}>
            Ver carrito
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartWidget;

