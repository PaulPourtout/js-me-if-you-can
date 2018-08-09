import {ColorPalette} from './Palette';

export const GlobalStyle = {
    linkButton : {
        padding: '1rem',
        cursor: 'pointer',
        backgroundColor: ColorPalette.primary,
        color: ColorPalette.tertiary,
        textDecoration: 'none',
        fontSize: '1rem',
        display: 'block',
    },

    linkListItem : {
        padding: '1rem',
        cursor: 'pointer',
        textDecoration: "none",
        fontSize: '1rem',
        display: 'block',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    },

    NavLinkStyle : {
        color: ColorPalette.tertiary,
        textDecoration: "none",
        fontSize: "1rem",
        margin: "0.2rem",
        zIndex: 100
    }
    
}
