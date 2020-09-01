import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import Datatable from '../../components/datatable'
import { create, get, find, update, deleteManager } from '../../controllers/manager'

export default class Managers extends Component {

    state = {
        managers: {
            columns: [
                {
                    label: 'Código',
                    field: 'id_manager',
                    sort: 'asc'
                },
                {
                    label: 'Nombre',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Apellidos',
                    field: 'last_name',
                    sort: 'asc'
                },
                {
                    label: 'Correo',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Alias',
                    field: 'alias',
                    sort: 'asc'
                },
                {
                    label: 'Acciónes',
                    field: 'handle',
                    sort: 'asc'
                }
            ],
            rows: []
        },
        manager: {
            id_manager: 0,
            email: '',
            alias: '',
            name: '',
            last_name: '',
            password: ''
        },
        showCreate: false,
        showUpdate: false,
        renderTable: false
    }

    links = [
        { name: 'Dashboard', 'route': '/dashboard' },
        { name: 'Mi perfil', 'route': '/profile_manager' },
        { name: 'Carreras', route: '/careers'},
        { name: 'Instituciones', route: '/institutions'},
        { name: 'Bachilleratos', route: '/titles'}
    ]

    handleChange = (type, value, key) => {
        const { state } = this

        state[type][key] = value

        this.setState({
            ...state
        })
    }

    handleShowCreate = () => {
        this.setState({
            manager: {
                id_manager: 0,
                email: '',
                alias: '',
                name: '',
                last_name: '',
                password: ''
            },
            showCreate: true
        })
    }

    handleClose = () => {
        this.setState({
            showCreate: false,
            showUpdate: false
        })
    }

    handleEditClick = async id_manager => {
        const res = await find(id_manager)
        if (res.status) {
            this.setState({
                manager: res.data,
                showUpdate: true
            })
        }
    }

    handleCreateSubmit = async event => {
        event.preventDefault()
        const res = await create(this.state.manager)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadManagers()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleUpdateSubmit = async event => {
        event.preventDefault()
        const res = await update(this.state.manager)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadManagers()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleDeleteClick = id_manager => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar al administrador?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteManager({ id_manager })
                    if (res.status) {
                        swal('Correcto', res.message, 'success')
                            .then(() => {
                                this.loadManagers()
                            })
                    }
                }
            })
    }

    loadManagers = async () => {
        this.setState({
            renderTable: false
        })
        const res = await get()
        if (res.status) {
            let { managers } = this.state
            res.data.map(item =>
                item.handle = (
                    <div className="d-flex justify-content-around">
                        <Button onClick={() => this.handleEditClick(item.id_manager)} variant="warning" size="sm"> Editar</Button>
                        <Button onClick={() => this.handleDeleteClick(item.id_manager)} variant="danger" size="sm"> Eliminar</Button>
                    </div>
                )
            )
            managers.rows = res.data
            this.setState({
                managers,
                renderTable: true
            })
        }
    }

    async componentDidMount() {
        await this.loadManagers()
    }

    render() {
        let { renderTable, managers, showCreate, showUpdate, manager } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_manager={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1">
                    <h1>Administradores</h1>
                    <Button onClick={this.handleShowCreate} variant="success">Crear</Button>
                    {
                        renderTable
                        &&
                        <Datatable data={managers} />
                    }
                </div>
                <Modal show={showCreate} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear administrador</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleCreateSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={manager.name}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'name')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={manager.last_name}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'last_name')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Alias</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="alias"
                                    value={manager.alias}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'alias')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={manager.email}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'email')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={manager.password}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'password')}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={showUpdate} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modificar administrador</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleUpdateSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={manager.name}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'name')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={manager.last_name}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'last_name')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Alias</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="alias"
                                    value={manager.alias}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'alias')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={manager.email}
                                    required
                                    onChange={value => this.handleChange('manager', value.target.value, 'email')}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Modificar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}