import { Outlet } from 'react-router';
import { NavbarSE } from './Navbar.jsx';
import { FooterSE } from './Footer.jsx';
import '../style/Layout.css';

function Layout() {

    return (
        <div className="layout-container">
            <NavbarSE />
            <main className="layout-content">
                <Outlet />
            </main>
            <FooterSE />
        </div>
    )
}

export { Layout }