import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { login } from '../../controllers/login_candidate'
import NavbarComponent from '../../components/navbar'
import auth from '../../utils/auth'

export default class LoginCandidate extends Component {

    constructor(props) {
        super(props)
        this.isAuth = auth.isAuthenticated()
    }

    state = {
        email: '',
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
            const res = await login(this.state)
            if (res.status) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id_candidate', res.data.id_candidate)
                console.log(localStorage.getItem('id_candidate'))
                swal(res.message, 'Presiona para continuar', 'success')
                    .then(value => this.props.history.push('/request'))
            } else {
                swal('Error', res.message, 'error')
            }
        } else {
            swal('Error', 'Verifica que NO eres un robot', 'error')
        }
    }

    componentDidMount() {
        this.isAuth && this.props.history.push('/request')
    }

    render() {
        const { email, password } = this.state
        return (
            <React.Fragment>
                <NavbarComponent />
                <div className="col-12 col-md-6 offset-md-3">
                    <h1>Iniciar Sesión</h1>
                    <Form onSubmit={this.handleSubmit}>
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
                            Ingresar
                        </Button>
                        <Link to="/register">
                            <p className="d-block mt-4">Registrate</p>
                        </Link>
                        <Link to="/forgot_password">
                            <p className="d-block mt-4">Reestablecer Contraseña</p>
                        </Link>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}