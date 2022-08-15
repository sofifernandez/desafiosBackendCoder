import "./NavBar.scss"
import { NavLink } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget"
import logo from '../../images/logo.png'


export const NavBar = () => {
    return (
        <header id="headerHOME" className="pb-md-5 container-fluid px-0 mx-0 justify-content-md-center justify-content-between">
            {/* Naegador pantallas de más de 768px */}
            <nav id="menuPrincipal" className="d-none d-md-block mb-4 fixed-top pb-5 px-0">
                <ul className="row px-0 mx-0 justify-content-center">
                    <li className="col-2"><NavLink className={({ isActive }) => (isActive ? "px-2 seccion-activa-md" : "px-2")} to={'/'}>HOME</NavLink></li>
                    <li className="col-2"><NavLink className={({ isActive }) => (isActive ? "px-2 seccion-activa-md" : "px-2")} to={'/form'}>Ingresar</NavLink></li>
                    <li className="col-2"><CartWidget /> </li>
                </ul>
            </nav>
            <div id="logoHeader" className="mt-md-5 d-none pt-md-5 col-4">
                <NavLink to={'/'}><img className="img-fluid" src={logo} alt="Logo" title="Logo" /></NavLink>
            </div>

            {/* <Naegador pantallas de menos de 768px */}
            <div className="row d-md-none pb-2 container-fluid justify-content-between" id='navegadorMobile'>
                <div id="logoHeader" className="mt-md-5 pt-md-5 col-6">
                    <NavLink to={'/'}><img className="img-fluid" src={logo} alt="Logo" title="Logo" /></NavLink>
                </div>
                <div className='col-6 row justify-content-end'>
                    <div className="col-8 fs-1">
                        <CartWidget />
                    </div>
                    <div className="dropdown d-flex d-md-none col-4">
                        <button className="btn btn-warning" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i className="fas fa-bars"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <li><NavLink className={({ isActive }) => (isActive ? "dropdown-item seccion-activa" : "dropdown-item")} to={'/'}>HOME</NavLink></li>
                            <li><NavLink className={({ isActive }) => (isActive ? "dropdown-item seccion-activa" : "dropdown-item")} to={'/form'}>Ingresar</NavLink></li>

                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}