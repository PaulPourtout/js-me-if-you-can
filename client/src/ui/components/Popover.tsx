import * as React from "react";
import styled from 'styled-components';
import {ColorPalette} from '../style/Palette';


interface IAction {
    label: string;
    func: () => void;
}

interface Props {
    ref?: any;
    style?: any;
    active: boolean;
    actions: IAction[];
    close: () => void;
}

export const Popover = ({active, actions, close}: Props) => {``
    if (!active) return <div></div>
    
    const executeAction = async (func) => {
        await func();
        close();
    }
    
    return (
        <Pop>
            <ul>
                {
                    actions.map((action, index) => (
                        <li key={`${index}`}>
                            <button onClick={() => executeAction(action.func)}>{action.label}</button>
                        </li>    
                    ))
                }
            </ul>
        </Pop>
    )
}

const Pop = styled.ul`
    position: absolute;
    top: 2rem;
    right: 0.5rem;
    min-width: 10rem;
    background-color: ${ColorPalette.background};
    z-index: 1000;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    border-radius: 2px;

    &:before {
        position: absolute;
        width: 0;
        height: 0;
        bottom: 100%;
        right: 0.3rem;
        border-style: solid;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent ${ColorPalette.background} transparent;
        content: "";
    }

    button {
        width: 100%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid rgba(0,0,0, 0.3);
        cursor: pointer;
        padding: 0.5rem 1rem;
        transition: 0.3s ease;

        &:hover {
            background-color: rgba(0,0,0,0.1);
        }

    }
`;
