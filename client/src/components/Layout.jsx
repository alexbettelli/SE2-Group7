import { Outlet } from 'react-router';
import { NavbarSE } from './Navbar.jsx';
import { FooterSE } from './Footer.jsx';

function Layout() {

    return (
        <>
            <NavbarSE />
            <Outlet />
            <FooterSE />
        </>
    )
}

export { Layout }