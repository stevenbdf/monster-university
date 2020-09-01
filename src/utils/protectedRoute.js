import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';
import auth_manager from './auth_manager'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                form: props.location
                            }
                        }
                    } />
                }

            }
        } />
    )
}

export const ProtectedRouteManager = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth_manager.isAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/manager",
                            state: {
                                form: props.location
                            }
                        }
                    } />
                }

            }
        } />
    )
}