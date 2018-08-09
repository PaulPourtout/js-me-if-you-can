import * as React from 'react';
import styled, {keyframes} from "styled-components";
import { ColorPalette } from '../style/Palette';


export interface IModal {
    visible: boolean;
    title: string;
    onClose?: () => void;
}

export class Modal extends React.Component<IModal, any>{
    constructor(props:IModal) {
        super(props)
    }

    render() {
        const {visible, title, children, onClose} = this.props;
        if (!visible) return <div></div>;

        return (
            <ModalContainer>
                <BackgroundLayer>
                    <ModalContent>
                        {
                            onClose &&
                            <CloseButton onClick={onClose}>X</CloseButton>
                        }
                        <Title>{title}</Title>
                        <ChildrenContainer>
                            { children && children }
                        </ChildrenContainer>
                    </ModalContent>
                </BackgroundLayer>
            </ModalContainer>
        )
    }
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`;

const fromTop = keyframes`
    from {
        transform: translateY(-200%);
        opacity: 0;
    } to {
        transform: translateY(0%);
        opacity: 1;
    }
`;


const ModalContainer = styled.article`
    z-index: 1001;
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    animation: ${fadeIn} 0.2s linear;
`


const CloseButton = styled.button`
    position: absolute;
    right: 1rem;
    top: 1rem;
`

const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid ${ColorPalette.primary}
`;


const  BackgroundLayer = styled.span`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.article`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    width: 70%;
    overflow: hidden;
    min-height: 20rem;
    border-radius: 0.2rem;
    box-shadow: 1rem 1rem 5rem rgba(0,0,0,0.3);
    animation: ${fromTop} 0.5s cubic-bezier(0.29, 0.01, 0.3, 1.05);
`;

const ChildrenContainer = styled.div`
    padding: 1rem;
    flex: 1;
`
