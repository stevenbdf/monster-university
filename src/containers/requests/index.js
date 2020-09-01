import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import { get, create, update, complete } from '../../controllers/request'
import { getInstitutions } from '../../controllers/institutions'
import { getTitlesByInsitution } from '../../controllers/titles'
import { getCareers } from '../../controllers/careers'

export default class Request extends Component {

    state = {
        id_request: 0,
        id_institution: 0,
        id_title: 0,
        init_year: '',
        end_year: '',
        phone: '',
        cell_phone: '',
        birthday: '',
        dui: '',
        nit: '',
        id_career: 0,
        photo: null,
        completed: 0,
        institutions: [],
        titles: [],
        careers: []
    }

    handleNewImage = value => {
        const { state } = this
        state.photo = value
        this.setState({
            ...state
        })
        console.log(this.state)
    }

    getRequest = async () => {
        const res = await get()
        if (res.status) {
            let { data } = res
            this.setState({
                ...data
            })
            await this.findTitles(data.id_institution)
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

    findTitles = async value => {
        const res = await getTitlesByInsitution({ id_institution: value })
        if (res.status) {
            let { data } = res
            this.setState({
                titles: data
            })
        }
    }

    findCareers = async () => {
        const res = await getCareers()
        if (res.status) {
            let { data } = res
            this.setState({
                careers: data
            })
        }
    }

    async componentDidMount() {
        await this.getRequest()
        await this.findInstitutions()
        await this.findCareers()
    }

    handleChange = async (value, key) => {
        const { state } = this

        state[key] = value

        this.setState({
            ...state
        })

        if (key === 'id_institution') {
            await this.findTitles(value)
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        let { id_request, id_institution, id_title, init_year, end_year, phone, cell_phone,
            birthday, dui, nit, id_career, photo, titles } = this.state
        let data = new FormData()
        data.append('id_institution', id_institution)
        if (!titles.length) id_title = 0
        data.append('id_title', id_title)
        data.append('init_year', init_year)
        data.append('end_year', end_year)
        data.append('phone', phone)
        data.append('cell_phone', cell_phone)
        data.append('birthday', birthday)
        data.append('dui', dui)
        data.append('nit', nit)
        data.append('id_career', id_career)
        data.append('photo', photo)

        if (id_request) {
            const res = await update(data)
            if (res.status === 1) {
                swal('Correcto', res.message, 'success')
                    .then(accept => this.getRequest())
            } else if (res.status === 2) {
                swal('Atención', res.message, 'warning')
            } else {
                swal('Error', res.message, 'error')
            }
        } else {
            const res = await create(data)
            console.log(res)
            if (res.status) {
                swal('Correcto', res.message, 'success')
                    .then(accept => this.getRequest())
            } else {
                swal('Error', res.message, 'error')
            }
        }

    }

    handleClickComplete = () => {
        swal({
            title: "Atención",
            text: "¿Quieres dar por completada la solicitud? No podrás modificar la información enviada",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await complete()
                    if (res.status) {
                        swal('Correcto', res.message, 'success').then(accept => this.getRequest())
                    } else {
                        swal('Error', res.message, 'error')
                    }
                }
            })
    }

    links = [
        { name: 'Mi perfil', route: '/profile_candidate' }
    ]

    render() {
        let { id_request, id_institution, id_title, init_year, end_year, phone, cell_phone,
            birthday, dui, nit, id_career, completed, institutions, titles, careers } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_candidate={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1 ">
                    <h1>LLena tu solicitud</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Institución de procedencia</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="id_institution"
                                        value={id_institution}
                                        required
                                        disabled={completed}
                                        onChange={value => this.handleChange(value.target.value, 'id_institution')}
                                    >

                                        <option>Selecciona una opción</option>
                                        {
                                            institutions
                                            &&
                                            institutions.map(item =>
                                                <option key={item.id_institution} value={item.id_institution}>{item.institution}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Titulo bachillerato</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="id_title"
                                        value={id_title}
                                        required
                                        disabled={completed}
                                        onChange={value => this.handleChange(value.target.value, 'id_title')}
                                    >
                                        <option>Selecciona una opción</option>
                                        {
                                            titles
                                            &&
                                            titles.map(item =>
                                                <option key={item.id_title} value={item.id_title}>{item.title}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Año inicio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="init_year"
                                        value={init_year}
                                        required
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'init_year')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Año fin</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="end_year"
                                        value={end_year}
                                        required
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'end_year')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        value={phone}
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'phone')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cell_phone"
                                        value={cell_phone}
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'cell_phone')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthday"
                                        required
                                        value={birthday}
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'birthday')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-3">
                                <Form.Group>
                                    <Form.Label>DUI</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="dui"
                                        required
                                        value={dui}
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'dui')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-3">
                                <Form.Group>
                                    <Form.Label>NIT</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="nit"
                                        required
                                        value={nit}
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'nit')}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Carrera a elegir</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="id_career"
                                        required
                                        value={id_career}
                                        readOnly={completed}
                                        onChange={value => this.handleChange(value.target.value, 'id_career')}
                                    >
                                        <option>Selecciona una opción</option>
                                        {
                                            careers
                                            &&
                                            careers.map(item =>
                                                <option key={item.id_career} value={item.id_career}>{item.career}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-12 col-md-6">
                                <Form.Group>
                                    <Form.Label>Foto</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="photo"
                                        onChange={value => this.handleNewImage(value.target.files[0])}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {
                            id_request
                                ?
                                <React.Fragment>
                                    {
                                        completed
                                            ?
                                            <React.Fragment>
                                                <a
                                                    href={'http://localhost/monster_university_backend/reports/request.php?id_candidate=' + localStorage.getItem('id_candidate')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-info">
                                                    Reporte
                                                </a>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <Button variant="primary" type="submit" className="mr-3">
                                                    Modificar
                                                </Button>
                                                <Button onClick={this.handleClickComplete} variant="danger" type="button" className="mr-3">
                                                    Finalizar
                                                </Button>
                                            </React.Fragment>
                                    }
                                </React.Fragment>
                                :
                                <Button variant="primary" type="submit">
                                    Crear
                                </Button>
                        }
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}