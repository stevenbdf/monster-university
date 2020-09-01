import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import Datatable from '../../components/datatable'
import { getCareers, create, find, update, deleteCareer } from '../../controllers/careers'

export default class Careers extends Component {

    state = {
        careers: {
            columns: [
                {
                    label: 'Código',
                    field: 'id_career',
                    sort: 'asc'
                },
                {
                    label: 'Nombre',
                    field: 'name',
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
        career: {
            id_career: 0,
            career: ''
        },
        showCreate: false,
        showUpdate: false,
        renderTable: false
    }

    links = [
        { name: 'Dashboard', 'route': '/dashboard' },
        { name: 'Mi perfil', 'route': '/profile_manager' },
        { name: 'Managers', route: '/managers' },
        { name: 'Instituciones', route: '/institutions' },
        { name: 'Bachilleratos', route: '/titles' }
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
                id_career: 0,
                career: ''
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

    handleEditClick = async id_career => {
        const res = await find(id_career)
        if (res.status) {
            this.setState({
                career: res.data,
                showUpdate: true
            })
        }
    }

    handleCreateSubmit = async event => {
        event.preventDefault()
        const res = await create(this.state.career)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadCareers()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleUpdateSubmit = async event => {
        event.preventDefault()
        const res = await update(this.state.career)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadCareers()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleDeleteClick = id_career => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar la carrera?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteCareer({ id_career })
                    if (res.status) {
                        swal('Correcto', res.message, 'success')
                            .then(() => {
                                this.loadCareers()
                            })
                    }
                }
            })
    }

    loadCareers = async () => {
        this.setState({
            renderTable: false
        })
        const res = await getCareers()
        if (res.status) {
            let { careers } = this.state
            res.data.map(item =>
                item.handle = (
                    <div className="d-flex justify-content-around">
                        <Button onClick={() => this.handleEditClick(item.id_career)} variant="warning" size="sm"> Editar</Button>
                        <Button onClick={() => this.handleDeleteClick(item.id_career)} variant="danger" size="sm"> Eliminar</Button>
                    </div>
                )
            )
            careers.rows = res.data
            this.setState({
                careers,
                renderTable: true
            })
        }
    }

    async componentDidMount() {
        await this.loadCareers()
    }

    render() {
        let { renderTable, careers, career, showCreate, showUpdate } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_manager={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1">
                    <h1>Carreras</h1>
                    <Button onClick={this.handleShowCreate} variant="success">Crear</Button>
                    {
                        renderTable
                        &&
                        <Datatable data={careers} />
                    }
                </div>
                <Modal show={showCreate} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear carrea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleCreateSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="career"
                                    value={career.career}
                                    required
                                    onChange={value => this.handleChange('career', value.target.value, 'career')}
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
                        <Modal.Title>Modificar carrera</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleUpdateSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="career"
                                    value={career.career}
                                    required
                                    onChange={value => this.handleChange('career', value.target.value, 'career')}
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