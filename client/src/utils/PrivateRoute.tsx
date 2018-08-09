import * as React from 'react';
import {Route, Redirect} from 'react-router';
import {Services} from "./services";
import {UserListener} from "../context/UserProvider";
import {IUser} from "../interfaces/IUser";


const PrivateRouteComponent = ({component: Component, user, ...rest}) => (
    <Route {...rest} render={(props) => (
        user.authenticated === true
            ? <Component {...props} />
            : <Redirect to='/'/>
    )}/>
)

export const createPathUrl = (pathUrl) => {
    return process.env.PUBLIC_URL + pathUrl;
}

export const PrivateRoute = UserListener(PrivateRouteComponent);