import * as React from 'react';
import App from './App';
// import {PageNotFound} from './ui/pages/PageNotFound';
// import { CodeEditor } from './ui/pages/CodeEditor';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {UserProvider} from './context/UserProvider'

export const history = createBrowserHistory()

export const AppRouter = (props) => (
    <UserProvider>
        <Router history={history}>
                <App/>
        </Router>
    </UserProvider>    
)