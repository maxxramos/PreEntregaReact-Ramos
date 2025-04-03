import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // 

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();


  const categoriasEnEspañol = {
    "women's clothing": "Ropa de Mujer",
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "home": "Hogar",
    "books": "Libros",
    "toys": "Juguetes",
 
  };

 
  const categoriaEnEspañol = categoriasEnEspañol[categoryId] || "Categoría General";

  useEffect(() => {
    const fetchProductos = async () => {
      let url;

      if (!categoryId) {
       
        url = `https://fakestoreapi.com/products`;
      } else {
       
        url = `https://fakestoreapi.com/products/category/${categoryId}`;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        setProductos(data || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Hubo un problema al cargar los productos.");
      }
    };

    fetchProductos();
  }, [categoryId]);

  const handleDetalleClick = (productoId) => {
    navigate(`/item/${productoId}`);
  };

  const handleAddToCart = (producto) => {
    addToCart(producto); 
  };

  return (
    <div className="container">
      <h2>{categoriaEnEspañol}</h2> {}
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div className="col-md-3 mb-3" key={producto.id}>
              <div className="card">
                <img
                  src={producto.image}
                  alt={producto.title}
                  className="card-img-top img-fluid"
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{producto.title}</h6>
                  <p className="card-text">${producto.price}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDetalleClick(producto.id)}
                    >
                      Detalle
                    </button>
                    {}
                    <button
                      className="btn btn-success"
                      onClick={() => handleAddToCart(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;

