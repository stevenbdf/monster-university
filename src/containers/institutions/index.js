import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import Datatable from '../../components/datatable'
import { getInstitutions, create, find, update, deleteInstitution } from '../../controllers/institutions'

export default class Institutions extends Component {

    state = {
        institutions: {
            columns: [
                {
                    label: 'Código',
                    field: 'id_institution',
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
        institution: {
            id_institution: 0,
            institution: ''
        },
        showCreate: false,
        showUpdate: false,
        renderTable: false
    }

    links = [
        { name: 'Dashboard', 'route': '/dashboard' },
        { name: 'Mi perfil', 'route': '/profile_manager' },
        { name: 'Managers', route: '/managers' },
        { name: 'Carreras', route: '/careers' },
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
            institution: {
                id_institution: 0,
                institution: ''
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

    handleEditClick = async id_institution => {
        const res = await find(id_institution)
        if (res.status) {
            this.setState({
                institution: res.data,
                showUpdate: true
            })
        }
    }

    handleCreateSubmit = async event => {
        event.preventDefault()
        const res = await create(this.state.institution)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadInstitutions()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleUpdateSubmit = async event => {
        event.preventDefault()
        const res = await update(this.state.institution)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadInstitutions()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleDeleteClick = id_institution => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar la institución?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteInstitution({ id_institution })
                    if (res.status) {
                        swal('Correcto', res.message, 'success')
                            .then(() => {
                                this.loadInstitutions()
                            })
                    }
                }
            })
    }

    loadInstitutions = async () => {
        this.setState({
            renderTable: false
        })
        const res = await getInstitutions()
        if (res.status) {
            let { institutions } = this.state
            res.data.map(item =>
                item.handle = (
                    <div className="d-flex justify-content-around">
                        <Button onClick={() => this.handleEditClick(item.id_institution)} variant="warning" size="sm"> Editar</Button>
                        <Button onClick={() => this.handleDeleteClick(item.id_institution)} variant="danger" size="sm"> Eliminar</Button>
                    </div>
                )
            )
            institutions.rows = res.data
            this.setState({
                institutions,
                renderTable: true
            })
        }
    }

    async componentDidMount() {
        await this.loadInstitutions()
    }

    render() {
        let { renderTable, institutions, institution, showCreate, showUpdate } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_manager={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1">
                    <h1>Instituciones</h1>
                    <Button onClick={this.handleShowCreate} variant="success">Crear</Button>
                    {
                        renderTable
                        &&
                        <Datatable data={institutions} />
                    }
                </div>
                <Modal show={showCreate} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear institución</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleCreateSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="institution"
                                    value={institution.institution}
                                    required
                                    onChange={value => this.handleChange('institution', value.target.value, 'institution')}
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
                        <Modal.Title>Modificar institución</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleUpdateSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="institution"
                                    value={institution.institution}
                                    required
                                    onChange={value => this.handleChange('institution', value.target.value, 'institution')}
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