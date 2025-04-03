import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; 

function Cart() {
  const { cart, removeItem } = useCart(); 
  
 
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log("Procesando compra", formData);
    alert("Compra realizada con éxito");
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="cart-item">
                  <span>{item.name}</span> {}
                  <span>${item.price.toFixed(2)}</span> {}
                  <span>Cantidad: {item.quantity}</span> {}
                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="remove-button"
                  >Eliminar</button> {}
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3> {}
          </div>

          {}
          <form onSubmit={handleCheckout} className="checkout-form">
            <h3>Datos para la compra</h3>
            <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
            <button 
              type="submit" 
              className="checkout-button"
            >Finalizar Compra</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
