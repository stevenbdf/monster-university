import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../controllers/forgot_password_candidate'
import NavbarComponent from '../../components/navbar'
import auth from '../../utils/auth'

export default class ForgotPasswordCandidate extends Component {

    constructor(props) {
        super(props)
        this.isAuth = auth.isAuthenticated()
    }

    state = {
        email: '',
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
            const res = await forgotPassword(this.state)
            if (res.status) {
                swal('Correcto', res.message, 'success')
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
        const { email } = this.state
        return (
            <React.Fragment>
                <NavbarComponent />
                <div className="col-12 col-md-6 offset-md-3">
                    <h1>Reestablecer Contraseña</h1>
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
                        <ReCAPTCHA
                            sitekey="6Lfmg78UAAAAAHbN5Zb27DFz1KFJvHC2TbavOIFs"
                            onChange={this.onChangeCaptcha}
                            hl={'es'}
                        />
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                        <Link to="/">
                            <p className="d-block mt-4">Iniciar Sesión</p>
                        </Link>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}