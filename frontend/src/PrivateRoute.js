import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isAuth from './Auth'


let existToken = () => {
    if(localStorage.getItem('token') !== null){
        if(isAuth()){
            return true
        }
    }
    return false
}

let PrivateRoute = ({component: Component, ...rest}) => {

    return(
        <Route 
            {...rest}
            render={props =>
            existToken()? (
                <Component {...props} />
            ): (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { message: 'Usuario no Autorizado' }
                    }}
                />
            )}
        />
    );
}

export default PrivateRoute;