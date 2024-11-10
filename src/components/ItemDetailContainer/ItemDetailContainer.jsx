// ItemDetailContainer.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();  // Usamos useNavigate para poder redirigir

  useEffect(() => {
    const url = `https://api.mercadolibre.com/items/${itemId}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error("Error al obtener los detalles del producto:", error));
  }, [itemId]);

  const handleVolverClick = () => {
    navigate(-1); // Vuelve a la página anterior (puede ser la lista de productos)
  };

  if (!producto) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className="card mt-4">
      <img
        src={producto.thumbnail}
        alt={producto.title}
        className="card-img-top img-fluid"
        style={{ maxHeight: "300px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{producto.title}</h5>
        <p className="card-text">Precio: ${producto.price}</p>
        <p className="card-text">Condición: {producto.condition === "new" ? "Nuevo" : "Usado"}</p>
        <a
          href={producto.permalink}
          className="btn btn-danger me-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en MercadoLibre
        </a>
        <button className="btn btn-secondary" onClick={handleVolverClick}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
