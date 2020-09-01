import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { login } from '../../controllers/login_manager'
import { count } from '../../controllers/manager'
import NavbarComponent from '../../components/navbar'
import auth from '../../utils/auth_manager'

export default class LoginManager extends Component {

    constructor(props) {
        super(props)
        this.isAuth = auth.isAuthenticated()
    }

    state = {
        alias: '',
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
                localStorage.setItem('token_manager', res.data.token)
                localStorage.setItem('id_manager', res.data.id_manager)
                console.log(localStorage.getItem('id_manager'))
                swal(res.message, 'Presiona para continuar', 'success')
                    .then(value => this.props.history.push('/dashboard'))
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
        if (res.data.quantity === 0) {
            this.props.history.push('/register_manager')
        }
    }

    render() {
        const { alias, password } = this.state
        return (
            <React.Fragment>
                <NavbarComponent />
                <div className="col-12 col-md-6 offset-md-3">
                    <h1>Iniciar Sesión (Dashboard)</h1>
                    <Form onSubmit={this.handleSubmit}>
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
                        <Link to="/forgot_password_manager">
                            <p className="d-block mt-4">Reestablecer Contraseña</p>
                        </Link>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}