import * as React from 'react';
import {Services} from '../utils/services';
import {IUser, IUserContext} from '../interfaces/IUser';
import {history} from '../Router';

// Search for localStorage profile to set auto connect
const Auth = Services.Auth;
const profile = Auth.getProfile();
if (profile) profile.authenticated = true;

const defaultState = {
    user: profile,
    newUser: (newUser:IUser) => null,
    logout: () => null,
    getToken: () => null
}

export const UserContext = React.createContext(defaultState);

export class UserProvider extends React.Component<any, IUserContext> {

    logoutUserState:IUser = {
        authenticated: false,
        admin:false,
        id:undefined,
        email:undefined,
        exp: undefined,
        iat: undefined,
        username: undefined,
    }

    state:IUserContext = {
        user: profile,
        newUser : () => {
            const profile = Auth.getProfile();
            if (profile) {
                profile.authenticated = true;
                this.setState({user: profile}, () =>  history.push('/dashboard'))
            }
        },
        getToken: Auth.getToken,
        logout : async () => {
            await Auth.removeToken();
            this.setState({user: this.logoutUserState}, () => {
                Auth.submitLogout();
                history.push('/')
            })
        }
    }

    render () {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }   
}

// Create HOC to get user state in other components
export const UserListener = (Component) => {
    return function ComponentWithUser(props:any) {
        return (
            <UserContext.Consumer>
                {(user:IUserContext) => (
                    <Component
                        {...props}
                        user={user.user}
                        logout={user.logout}
                        login={user.newUser}
                        getToken={user.getToken}
                    />
                )}
            </UserContext.Consumer>
        )
    }
}
