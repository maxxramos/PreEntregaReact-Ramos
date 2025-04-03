import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      const url = `https://fakestoreapi.com/products/${itemId}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener los detalles del producto");
        }

        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
        setError("Hubo un problema al cargar los detalles del producto.");
      }
    };

    fetchProducto();
  }, [itemId]);

  const handleVolverClick = () => {
    navigate(-1);
  };

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  if (!producto) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className="card mt-4">
      <img
        src={producto.image}
        alt={producto.title}
        className="card-img-top img-fluid"
        style={{ maxHeight: "300px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{producto.title}</h5>
        <p className="card-text">Precio: ${producto.price}</p>
        <p className="card-text">{producto.description}</p>
        <button className="btn btn-secondary" onClick={handleVolverClick}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default ItemDetailContainer;


