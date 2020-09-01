import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert'
import NavbarComponent from '../../components/navbar'
import { find, update, updatePassword } from '../../controllers/profile_manager'

export default class ProfileManager extends Component {
    
    state = {
        info: {
            email: '',
            name: '',
            alias: '',
            last_name: ''
        },
        passwords: {
            password: '',
            password_2: '',
            new_password: '',
            new_password_2: ''
        }
    }

    links = [
        { name: 'Dashboard', 'route': '/dashboard' },
        { name: 'Managers', 'route': '/managers' },
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

    handleSubmit = async event => {
        event.preventDefault()
        const res = await update(this.state.info)
        if (res.status) {
            swal('Correcto', res.message, 'success')
        } else {
            swal('Error', res.message, 'error')
        }
    }

    handlePasswordSubmit = async event => {
        event.preventDefault()
        const res = await updatePassword(this.state.passwords)
        console.log(res)
        if (res.status) {
            swal('Correcto', res.message, 'success')
            this.setState({
                ...this.state,
                passwords: {
                    password: '',
                    password_2: '',
                    new_password: '',
                    new_password_2: ''
                }
            })
            console.log(this.state)
        } else {
            swal('Error', res.message, 'error')
        }
    }

    async componentDidMount() {
        const res = await find()
        this.setState({
            info: res.data
        })
    }

    render() {
        let { email, name, alias, last_name } = this.state.info
        let { password, password_2, new_password, new_password_2 } = this.state.passwords
        return (
            <React.Fragment>
                <NavbarComponent links={this.links} logout_manager={true} history={this.props.history} />
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
                                onChange={value => this.handleChange('info', value.target.value, 'name')}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={last_name}
                                required
                                onChange={value => this.handleChange('info', value.target.value, 'last_name')}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alias</Form.Label>
                            <Form.Control
                                type="text"
                                name="alias"
                                value={alias}
                                required
                                onChange={value => this.handleChange('info', value.target.value, 'alias')}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                required
                                onChange={value => this.handleChange('info', value.target.value, 'email')}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Modificar
                        </Button>
                    </Form>
                    <h1 className="mt-4">Modificar contraseña</h1>
                    <Form onSubmit={this.handlePasswordSubmit}>
                        <div className="row">
                            <Form.Group className="col-12 col-md-6">
                                <Form.Label>Contraseña actual</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    required
                                    onChange={value => this.handleChange('passwords', value.target.value, 'password')}
                                />
                            </Form.Group>
                            <Form.Group className="col-12 col-md-6">
                                <Form.Label>Repite la contraseña actual</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password_2"
                                    value={password_2}
                                    required
                                    onChange={value => this.handleChange('passwords', value.target.value, 'password_2')}
                                />
                            </Form.Group>
                            <Form.Group className="col-12 col-md-6">
                                <Form.Label>Contraseña nueva</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="new_password"
                                    value={new_password}
                                    required
                                    onChange={value => this.handleChange('passwords', value.target.value, 'new_password')}
                                />
                            </Form.Group>
                            <Form.Group className="col-12 col-md-6">
                                <Form.Label>Repite la contraseña nueva</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="new_password_2"
                                    value={new_password_2}
                                    required
                                    onChange={value => this.handleChange('passwords', value.target.value, 'new_password_2')}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="primary" type="submit">
                            Modificar
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}