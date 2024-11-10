import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemListContainer() {
  const [productos, setProductos] = useState([]); 
  const { categoryId } = useParams();  
  const navigate = useNavigate(); 

  useEffect(() => {
    let keyword = "general";
    if (categoryId === "electronica") {
      keyword = "electrónica";
    } else if (categoryId === "hogar") {
      keyword = "hogar";
    }

  
    const url = `https://api.mercadolibre.com/sites/MLU/search?q=${keyword}&limit=12`;

   
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setProductos(data.results || []))
      .catch((error) => console.error("Error al obtener datos de la API:", error));
  }, [categoryId]);

  // Función para navegar a la ruta de detalle de un producto
  const handleDetalleClick = (productoId) => {
    navigate(`/item/${productoId}`);
  };

  return (
    <div className="container">
      <div className="row">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div className="col-md-3 mb-3" key={producto.id}>
              <div className="card">
                <img
                  src={producto.thumbnail}
                  alt={producto.title}
                  className="card-img-top img-fluid"
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{producto.title}</h6>
                  <p className="card-text">${producto.price}</p>
                  <div className="d-flex justify-content-between">
                    <a
                      href={producto.permalink}
                      className="btn btn-danger"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver producto
                    </a>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDetalleClick(producto.id)}
                    >
                      Detalle
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
