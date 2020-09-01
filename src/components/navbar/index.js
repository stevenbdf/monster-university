import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import swal from 'sweetalert'

const handleCloseCandidate = history => {
    swal({
        title: "Atención",
        text: "¿Quieres cerrar sesión?",
        icon: "warning",
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: true,
    })
        .then((close) => {
            if (close) {
                localStorage.removeItem('token')
                localStorage.removeItem('id_candidate')
                history.replace('/')
            }
        })
}

const handleCloseManager = history => {
    swal({
        title: "Atención",
        text: "¿Quieres cerrar sesión?",
        icon: "warning",
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: true,
    })
        .then((close) => {
            if (close) {
                localStorage.removeItem('token_manager')
                localStorage.removeItem('id_manager')
                history.replace('/manager')
            }
        })
}

const NavbarComponent = ({ links, logout_candidate, logout_manager, history }) =>
    <Navbar bg="primary" variant="dark" className="mb-4">
        <Navbar.Brand href="#home">Monsters University</Navbar.Brand>
        <Nav className="mr-auto">
            {
                links && links.map((item, index) =>
                    <Link key={index + 1} to={item.route}>
                        <p className="text-white mt-3 mr-3">{item.name}</p>
                    </Link>
                )
            }
            {
                logout_candidate &&
                <p onClick={() => handleCloseCandidate(history)} className="text-white mt-3" style={{ cursor: 'pointer' }}>Cerrar Sesión</p>
            }
            {
                logout_manager &&
                <p onClick={() => handleCloseManager(history)} className="text-white mt-3" style={{ cursor: 'pointer' }}>Cerrar Sesión</p>
            }
        </Nav>
    </Navbar>


export default NavbarComponent