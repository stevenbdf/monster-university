import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import Datatable from '../../components/datatable'
import { getTitles, create, find, update, deleteInstitution } from '../../controllers/titles'
import { getInstitutions } from '../../controllers/institutions'

export default class Titles extends Component {

    state = {
        titles: {
            columns: [
                {
                    label: 'Código',
                    field: 'id_title',
                    sort: 'asc'
                },
                {
                    label: 'Institución',
                    field: 'institution',
                    sort: 'asc'
                },
                {
                    label: 'Nombre',
                    field: 'title',
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
        title: {
            id_title: 0,
            id_institution: 0,
            title: ''
        },
        showCreate: false,
        showUpdate: false,
        renderTable: false,
        institutions: []
    }

    links = [
        { name: 'Dashboard', 'route': '/dashboard' },
        { name: 'Mi perfil', 'route': '/profile_manager' },
        { name: 'Managers', route: '/managers' },
        { name: 'Carreras', route: '/careers' },
        { name: 'Instituciónes', route: '/institutions' }
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
            title: {
                id_title: 0,
                id_institution: 0,
                title: ''
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

    handleEditClick = async id_title => {
        const res = await find(id_title)
        if (res.status) {
            this.setState({
                title: res.data,
                showUpdate: true
            })
        }
    }

    handleCreateSubmit = async event => {
        event.preventDefault()
        const res = await create(this.state.title)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadTitles()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleUpdateSubmit = async event => {
        event.preventDefault()
        const res = await update(this.state.title)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(() => {
                    this.handleClose()
                    this.loadTitles()
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handleDeleteClick = id_title => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar el bachillerato?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteInstitution({ id_title })
                    if (res.status) {
                        swal('Correcto', res.message, 'success')
                            .then(() => {
                                this.loadTitles()
                            })
                    }
                }
            })
    }

    loadTitles = async () => {
        this.setState({
            renderTable: false
        })
        const res = await getTitles()
        if (res.status) {
            let { titles } = this.state
            res.data.map(item =>
                item.handle = (
                    <div className="d-flex justify-content-around">
                        <Button onClick={() => this.handleEditClick(item.id_title)} variant="warning" size="sm"> Editar</Button>
                        <Button onClick={() => this.handleDeleteClick(item.id_title)} variant="danger" size="sm"> Eliminar</Button>
                    </div>
                )
            )
            titles.rows = res.data
            this.setState({
                titles,
                renderTable: true
            })
        }
    }

    findInstitutions = async () => {
        const res = await getInstitutions()
        if (res.status) {
            let { data } = res
            this.setState({
                institutions: data
            })
        }
    }

    async componentDidMount() {
        await this.loadTitles()
        await this.findInstitutions()
    }

    render() {
        let { renderTable, titles, title, showCreate, showUpdate, institutions } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_manager={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1">
                    <h1>Bachilleratos</h1>
                    <Button onClick={this.handleShowCreate} variant="success">Crear</Button>
                    {
                        renderTable
                        &&
                        <Datatable data={titles} />
                    }
                </div>
                <Modal show={showCreate} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear bachillerato</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleCreateSubmit}>
                            <Form.Group>
                                <Form.Label>Institución</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_institution"
                                    value={title.id_institution}
                                    required
                                    onChange={value => this.handleChange('title', value.target.value, 'id_institution')}
                                >
                                    <option>Selecciona una opción</option>
                                    {
                                        institutions
                                        &&
                                        institutions.map(item =>
                                            <option key={item.id_institution} value={item.id_institution}>{item.institution}</option>
                                        )
                                    }
                                </ Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={title.title}
                                    required
                                    onChange={value => this.handleChange('title', value.target.value, 'title')}
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
                        <Modal.Title>Modificar bachillerato</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleUpdateSubmit}>
                            <Form.Group>
                                <Form.Label>Institución</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_institution"
                                    value={title.id_institution}
                                    required
                                    onChange={value => this.handleChange('title', value.target.value, 'id_institution')}
                                >
                                    <option>Selecciona una opción</option>
                                    {
                                        institutions
                                        &&
                                        institutions.map(item =>
                                            <option key={item.id_institution} value={item.id_institution}>{item.institution}</option>
                                        )
                                    }
                                </ Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={title.title}
                                    required
                                    onChange={value => this.handleChange('title', value.target.value, 'title')}
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