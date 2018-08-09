import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ColorPalette} from '../style/Palette';

interface ILinkButton {
    to:string;
    label:string;
}

export const LinkButton = (props:ILinkButton) => (
    <Button>
        <Link style={linkStyle} to={props.to}>{props.label}</Link>
    </Button>
) 

const linkStyle = {
    color: ColorPalette.tertiary,
    fontSize: '1rem',
    textDecoration: "none",
    padding: '0.5rem 1rem',
    display: 'block'
}

const Button = styled.button`
    border: none;
    background-color: ${ColorPalette.primary};
`;