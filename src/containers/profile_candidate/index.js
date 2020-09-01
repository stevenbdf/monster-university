import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import { get, update } from '../../controllers/profile_candidate'

export default class Request extends Component {

    state = {
        email: '',
        name: '',
        last_name: ''
    }

    
    links = [
        { name: 'Llenar solicitud', route: '/request' }
    ]

    handleChange = (value, key) => {
        const { state } = this

        state[key] = value

        this.setState({
            ...state
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const res = await update(this.state)
        if (res.status) {
            swal('Correcto',res.message, 'success')
        } else {
            swal('Error', res.message, 'error')
        }
    }

    async componentDidMount() {
        const res = await get()
        let { data } = res
        this.setState({
            ...data
        })
    }

    render() {
        let { email, name, last_name } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_candidate={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1">
                    <h1>Mi perfil</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                required
                                onChange={value => this.handleChange(value.target.value, 'name')}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={last_name}
                                required
                                onChange={value => this.handleChange(value.target.value, 'last_name')}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                required
                                onChange={value => this.handleChange(value.target.value, 'email')}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Modificar
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}