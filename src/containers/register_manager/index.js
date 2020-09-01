import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import swal from 'sweetalert'
import { count, create } from '../../controllers/manager'
import NavbarComponent from '../../components/navbar'
import auth from '../../utils/auth_manager'

export default class RegisterManager extends Component {

    constructor(props) {
        super(props)
        this.isAuth = auth.isAuthenticated()
    }

    state = {
        email: '',
        alias: '',
        name: '',
        last_name: '',
        password: '',
        captcha: null
    }

    onChangeCaptcha = value => {
        this.setState({
            captcha: value
        })
    }

    handleChange = (value, key) => {
        const { state } = this

        state[key] = value

        this.setState({
            ...state
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        if (this.state.captcha) {
            const res = await create(this.state)
            if (res.status) {
                swal('Correcto', res.message, 'success')
                    .then(value => this.props.history.push('/manager'))
            } else {
                swal('Error', res.message, 'error')
            }
        } else {
            swal('Error', 'Verifica que NO eres un robot', 'error')
        }
    }

    async componentDidMount() {
        this.isAuth && this.props.history.push('/dashboard')

        const res = await count()
        if (res.data.quantity > 0) {
            this.props.history.push('/manager')
        }
    }

    render() {
        const { name, last_name, alias, email, password } = this.state
        return (
            <React.Fragment>
                <NavbarComponent />
                <div className="col-12 col-md-6 offset-md-3">
                    <h1>Registrate</h1>
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
                            <Form.Label>Alias</Form.Label>
                            <Form.Control
                                type="text"
                                name="alias"
                                value={alias}
                                required
                                onChange={value => this.handleChange(value.target.value, 'alias')}
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
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                required
                                onChange={value => this.handleChange(value.target.value, 'password')}
                            />
                        </Form.Group>
                        <ReCAPTCHA
                            sitekey="6Lfmg78UAAAAAHbN5Zb27DFz1KFJvHC2TbavOIFs"
                            onChange={this.onChangeCaptcha}
                            hl={'es'}
                        />
                        <Button variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}