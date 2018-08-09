import * as React from 'react';
import {LinkButton} from '../components/LinkButton';

export const PageNotFound = (props) => (
    <div>
        <h1>404</h1>
        <h3>Page not found</h3>
        <LinkButton to="/" label="Click here to go back to home page"/>
    </div>
);