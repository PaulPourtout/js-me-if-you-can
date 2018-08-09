import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {ColorPalette} from "../style/Palette";

interface Props {
    current: number;
    maxLevel: number;
}

export class LevelsBar extends React.Component<Props, {}> {
    render () {
        const currentArr = Array.from({length: this.props.current}, (v, k) => k);
        const maxLevelArr = Array.from({length: this.props.maxLevel - this.props.current}, (v, k) => k);
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center", padding: 10}}>
                {
                    currentArr.map((lvl, index) => (
                        <Puce key={`lvl-${index}`} size={10} color={'teal'} />
                    ))
                }
                {
                    <div>
                        <Puce animated color={ColorPalette.secondary}/>
                    </div>
                }
                {
                    maxLevelArr.map((lvl, index) => (
                        <Puce key={`mac-lvl-${index}`}/>
                    ))
                }
            </div>
        )
    }
}


interface PuceProps {
    size?: number;
    color?: string;
    animated?:boolean;
}

const pulseAnimation = keyframes`
    from {
        transform: scale(1);
    } to {
        transform: scale(2); 
    }
`;

const Puce = styled.div`
    height: ${(props:PuceProps) => props.size ? props.size : 5}px;
    width: ${(props:PuceProps) => props.size ? props.size : 5}px;
    border-radius: 50%;
    background-color: ${(props:PuceProps) => props.color ? props.color : 'grey'};
    margin-right: 10px;
    animation: ${(props:PuceProps) => props.animated ? `${pulseAnimation} 1s ease infinite alternate` : ''};
    transition: 0.2s ease;
`;

