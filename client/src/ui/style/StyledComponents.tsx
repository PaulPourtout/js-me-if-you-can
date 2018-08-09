import styled from 'styled-components';
import {ColorPalette} from './Palette';

interface IButton {
    fullWidth?: boolean;
    active?: boolean;
    background?: {main: string, hover: string}
}

export const Button = styled.button`
    background-color: ${(p: IButton) =>
        p.active ? p.background ? p.background.main : ColorPalette.primary : ColorPalette.inactiveButton};
    border: none;
    color: ${ColorPalette.tertiary};
    padding: 15px;
    width: ${(p: IButton) => (p.fullWidth ? "100%" : "auto")};
    outline: none;
    transition: 0.2s ease;

    a {
        color: ${ColorPalette.tertiary};
        font-size: 1rem;
        text-decoration: none;
    }

    &:focus {
        background-color: ${(p:IButton) => p.background ? p.background.hover : ColorPalette.inactiveButton};
    }
    &:hover {
        cursor: ${(p: IButton) => (p.active ? "pointer" : "auto")};
        background-color: ${(p:IButton) => p.background ? p.background.hover : ColorPalette.inactiveButton};
    }
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
`;

export const EditorContainer = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${ColorPalette.underBackground};
`;

export const PageContainer = EditorContainer.extend`
    padding: 4rem 10%;

    @media (max-width: 600px) {
        padding: 2rem 0;
    }
`;

export const SectionTitle = styled.h3`
    font-size: 14px;
    padding: 15px;
    margin: 0;
    text-align: center;
    border-left: 4px solid ${ColorPalette.secondary};
    text-transform: uppercase;
    color: ${ColorPalette.tertiary};
    background-color: ${ColorPalette.primary};
`;

export const Card = styled.article`
    background-color: ${ColorPalette.background};
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

export const CardHoverable = styled.section`
    background-color: ${ColorPalette.background};
    padding: 4rem 1rem;
    flex: 1;
    margin: 1rem;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.1);
    border-radius: 2px;
    transition: 0.3s;
    
    &:hover {
        transform: translateY(-0.3rem);
    }

    h2 {
        font-size: 1.4rem;
        text-align: center;
        font-weight: bold;
        color: ${ColorPalette.activeText}
    }

    ul {
        text-align: center;
    }
`;

export const CardTitle = styled.div`
    padding: 1rem;
    text-transform: uppercase;
    color: ${ColorPalette.primary};
    background-color: ${ColorPalette.secondary};
    font-weight: bold;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;

`;
