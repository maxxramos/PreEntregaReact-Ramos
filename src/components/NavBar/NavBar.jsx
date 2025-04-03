import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Max Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/category/electronics">
                Electrónica
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/category/jewelery">
                Joyería
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/category/men's clothing">
                Ropa de Hombre
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/category/women's clothing">
                Ropa de Mujer
              </Link>
            </li>
          </ul>

          {}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <CartWidget />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
